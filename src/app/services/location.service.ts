import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Position, Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private lastPosition: Position | null = null; // In-memory cache
  private ipStackKey = 'd6feabbbb3247bf95a8f95c9df283346'; // Replace with your key
  isLocationEnable: boolean = true; // default true
  constructor(private http: HttpClient) { }

  /**
   * Get location fast — returns cached location instantly, 
   * while updating in background
   */
  async getFastLocation(highAccuracy = false): Promise<Position | null> {
    if (this.lastPosition) {
      // Refresh in background
      this.refreshLocation(highAccuracy);
      return this.lastPosition;
    }
    // No cache? Fetch fresh
    return await this.refreshLocation(highAccuracy);
  }

  /**
   * Refreshes location from GPS or IP fallback
   */
  private async refreshLocation(highAccuracy = false): Promise<Position | null> {
    try {
      const position = await this.getLocationWithFallback(highAccuracy);
      if (position) {
        this.lastPosition = position;
      }
      return position;
    } catch {
      return null;
    }
  }

  /**
   * Runs GPS & IP-based location lookup in parallel, returns fastest
   */
  private async getLocationWithFallback(highAccuracy = false): Promise<Position | null> {
      const gpsPromise = this.getCurrentPositionNativeFast(highAccuracy);
  const ipPromise = this.getLocationByIP();

  const result = await Promise.race([gpsPromise, ipPromise]);

  // Update location enable flag
  this.isLocationEnable = !!(result && result.coords);

  return result;
  }

  /**
   * Fast GPS-based location (Capacitor)
   */
  private async getCurrentPositionNativeFast(highAccuracy = false): Promise<Position | null> {
    try {
      return await Geolocation.getCurrentPosition({
        enableHighAccuracy: highAccuracy,
        timeout: 5000 // Short timeout for speed
      });
    } catch (err) {
      console.warn('GPS location failed:', err);
      return null;
    }
  }

  /**
   * IP-based location fallback
   */
  private async getLocationByIP(): Promise<Position | null> {
    try {
      const ip: any = await this.getIp();
      const data: any = await this.getDataByIP(ip.ip);
      return {
        coords: {
          latitude: data.latitude,
          longitude: data.longitude,
          accuracy: 5000,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null
        },
        timestamp: Date.now()
      };
    } catch (err) {
      console.warn('IP location failed:', err);
      return null;
    }
  }

  /**
   * Get public IP
   */
  private getIp(): Promise<any> {
    return this.http.get('https://api.ipify.org/?format=json').toPromise();
  }

  /**
   * Get location data by IP
   */
  private getDataByIP(ip: string): Promise<any> {
    return this.http
      .get(`https://api.ipstack.com/${ip}?access_key=${this.ipStackKey}`)
      .toPromise();
  }
}
