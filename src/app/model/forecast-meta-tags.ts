  export const current = (lng: any, obj: any) => {
    const metaData: any = {
      en: {
        title: `Current weather and temperature in ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: Hourly and weekly weather forecast for ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
        description: `Weather in ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: Get the current weather, hourly and weekly weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, along with current temperature, rainfall, wind speed, humidity, air-quality, 15-days weather forecast and season trend for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `Weather in ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},Weather in ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, todayWeather in ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, nowweather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},current weather in ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},current temperature in ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},weekly weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},weather trend in ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},season trend in ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},weather update for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},weather news for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      hi: {
        title: `वर्तमान मौसम और तापमान${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} में वर्तमान मौसम और तापमान: ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} के लिए प्रति घंटा और साप्ताहिक मौसम पूर्वानुमान`,
        description: `में मौसम${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} में मौसम: ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} के लिए वर्तमान मौसम, प्रति घंटा और साप्ताहिक मौसम पूर्वानुमान प्राप्त करें, साथ ही ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} के लिए वर्तमान तापमान, वर्षा, हवा की गति, आर्द्रता, वायु-गुणवत्ता, 15-दिन का मौसम पूर्वानुमान और मौसम की प्रवृत्ति भी प्राप्त करें`,
        keywords: `में मौसम${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} में मौसम,${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} में मौसम, आज${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} में मौसम, अभी${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} के लिए मौसम का पूर्वानुमान,${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} में वर्तमान मौसम,${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} में वर्तमान तापमान,${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} के लिए साप्ताहिक मौसम का पूर्वानुमान,${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} में मौसम का रुझान,${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} में मौसम का रुझान,${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} के लिए मौसम का अपडेट,${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']} के लिए मौसम की खबरें`,
      },
      mr: {
        title: `सध्याचे हवामान आणि तापमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: साठी तासाभराचा आणि आठवड्याचा हवामान अंदाज ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
        description: `हवामान${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: साठी सध्याचे हवामान, तासाभराचे आणि आठवड्याचे हवामान अंदाज मिळवा ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, सध्याचे तापमान, पाऊस, वाऱ्याचा वेग, आर्द्रता, हवेची गुणवत्ता, १५ दिवसांचा हवामान अंदाज आणि हंगामाचा ट्रेंड यासह ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `हवामान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},हवामान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, आज हवामान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, साठी आता हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},सध्याचे हवामान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},सध्याचे तापमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},आठवड्याचा हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},हवामान कल ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},हंगामातील ट्रेंड ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},हवामान अपडेट ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},हवामान बातम्या ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      bn: {
        title: `বর্তমান আবহাওয়া এবং তাপমাত্রা ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: প্রতি ঘণ্টায় এবং সাপ্তাহিক আবহাওয়ার পূর্বাভাস ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
        description: `আবহাওয়া ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: বর্তমান আবহাওয়া, প্রতি ঘণ্টা এবং সাপ্তাহিক আবহাওয়ার পূর্বাভাস পান ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, বর্তমান তাপমাত্রা, বৃষ্টিপাত, বাতাসের গতি, আর্দ্রতা, বাতাসের গুণমান, ১৫ দিনের আবহাওয়ার পূর্বাভাস এবং ঋতুর প্রবণতা সহ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `আবহাওয়া ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},আবহাওয়া ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, আজকের আবহাওয়া ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, এখন আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},বর্তমান আবহাওয়া ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},বর্তমান তাপমাত্রা ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},সাপ্তাহিক আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},আবহাওয়ার প্রবণতা ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},ঋতু প্রবণতা ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},আবহাওয়ার আপডেট ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},আবহাওয়ার খবর ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      gu: {
        title: `વર્તમાન હવામાન અને તાપમાન ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: માટે કલાકદીઠ અને સાપ્તાહિક હવામાન આગાહી ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
        description: `હવામાન ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: વર્તમાન હવામાન, કલાકદીઠ અને સાપ્તાહિક હવામાન આગાહી મેળવો ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, વર્તમાન તાપમાન, વરસાદ, પવનની ગતિ, ભેજ, હવાની ગુણવત્તા, 15-દિવસની હવામાન આગાહી અને મોસમના વલણ સાથે ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `હવામાન ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},હવામાન ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, આજે હવામાન ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, હવે હવામાનની આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},વર્તમાન હવામાન ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},વર્તમાન તાપમાન ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},માટે સાપ્તાહિક હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},હવામાન વલણ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},માં સીઝન ટ્રેન્ડ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},હવામાન અપડેટ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},હવામાન સમાચાર ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      ta: {
        title: `தற்போதைய வானிலை மற்றும் வெப்பநிலை ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: மணிநேர மற்றும் வாராந்திர வானிலை முன்னறிவிப்பு ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
        description: `வானிலை ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: தற்போதைய வானிலை, மணிநேர மற்றும் வாராந்திர வானிலை முன்னறிவிப்பைப் பெறுங்கள் ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, தற்போதைய வெப்பநிலை, மழைப்பொழிவு, காற்றின் வேகம், ஈரப்பதம், காற்றின் தரம், 15 நாட்கள் வானிலை முன்னறிவிப்பு மற்றும் பருவப் போக்கு ஆகியவற்றுடன் ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `வானிலை ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},வானிலை ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, இன்று வானிலை ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, இப்போது வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},தற்போதைய வானிலை ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},தற்போதைய வெப்பநிலை ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},வாராந்திர வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},வானிலை போக்கு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},பருவப் போக்கு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},வானிலை அறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},வானிலை செய்திகள் ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      te: {
        title: `ప్రస్తుత వాతావరణం మరియు ఉష్ణోగ్రత ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: గంట మరియు వారపు వాతావరణ సూచన ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
        description: `లో వాతావరణం ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: ప్రస్తుత వాతావరణం, గంటవారీ మరియు వారపు వాతావరణ సూచనను పొందండి ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, ప్రస్తుత ఉష్ణోగ్రత, వర్షపాతం, గాలి వేగం, తేమ, గాలి నాణ్యత, 15 రోజుల వాతావరణ సూచన మరియు సీజన్ ట్రెండ్‌తో పాటు ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `లో వాతావరణం ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},లో వాతావరణం ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, ఈరోజు లో వాతావరణం ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, ఇప్పుడు వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},ప్రస్తుత వాతావరణం ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},ప్రస్తుత ఉష్ణోగ్రత ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},వారపు వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},వాతావరణ ధోరణి ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},సీజన్ ట్రెండ్ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},వాతావరణ నవీకరణ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},వాతావరణ వార్తలు ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      kn: {
        title: `ಪ್ರಸ್ತುತ ಹವಾಮಾನ ಮತ್ತು ತಾಪಮಾನ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: ಗಂಟೆಯ ಮತ್ತು ಸಾಪ್ತಾಹಿಕ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
        description: `ಹವಾಮಾನ ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: ಪ್ರಸ್ತುತ ಹವಾಮಾನ, ಗಂಟೆಯ ಮತ್ತು ವಾರದ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಯನ್ನು ಪಡೆಯಿರಿ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, ಪ್ರಸ್ತುತ ತಾಪಮಾನ, ಮಳೆ, ಗಾಳಿಯ ವೇಗ, ಆರ್ದ್ರತೆ, ಗಾಳಿಯ ಗುಣಮಟ್ಟ, 15 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಋತುವಿನ ಪ್ರವೃತ್ತಿಯೊಂದಿಗೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `ಹವಾಮಾನ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},ಹವಾಮಾನ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, ಇಂದು ಹವಾಮಾನ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, ಈಗ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},ಪ್ರಸ್ತುತ ಹವಾಮಾನ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},ಪ್ರಸ್ತುತ ತಾಪಮಾನ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},ವಾರದ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},ಹವಾಮಾನ ಪ್ರವೃತ್ತಿ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},ಋತುವಿನ ಪ್ರವೃತ್ತಿ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},ಹವಾಮಾನ ನವೀಕರಣ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},ಹವಾಮಾನ ಸುದ್ದಿಗಳು ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      ml: {
        title: `നിലവിലെ കാലാവസ്ഥയും താപനിലയും ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: മണിക്കൂർ, ആഴ്ചതോറുമുള്ള കാലാവസ്ഥാ പ്രവചനം ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
        description: `കാലാവസ്ഥ ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}: നിലവിലെ കാലാവസ്ഥ, മണിക്കൂർ, ആഴ്ചതോറുമുള്ള കാലാവസ്ഥാ പ്രവചനം നേടുക. ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, നിലവിലെ താപനില, മഴ, കാറ്റിന്റെ വേഗത, ഈർപ്പം, വായുവിന്റെ ഗുണനിലവാരം, 15 ദിവസത്തെ കാലാവസ്ഥാ പ്രവചനം, സീസൺ ട്രെൻഡ് എന്നിവയോടൊപ്പം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `കാലാവസ്ഥ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},കാലാവസ്ഥ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, ഇന്ന് കാലാവസ്ഥ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}, ഇപ്പോൾ കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},ഇപ്പോഴത്തെ കാലാവസ്ഥ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},നിലവിലെ താപനില ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},ആഴ്ചതോറുമുള്ള കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},കാലാവസ്ഥാ പ്രവണത ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},സീസണിലെ ട്രെൻഡ് ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},കാലാവസ്ഥാ അപ്‌ഡേറ്റ് ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},കാലാവസ്ഥാ വാർത്തകൾ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
    };
  
    return metaData[lng] || metaData['en'];
  };
  
  export const extended_forecast = (lng: any, obj: any) => {
    const metaData: any = {
      en: {
        title: `Extended weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}:  15 days forecast for ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
  
        description: `Extended weather forecast for
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : Get the 15 days forecast for
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        along with current weather situation. Also get the hourly, daily and weekly weather forecast, along with weather trends and alerts for
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `Weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        extended weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 days weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        weekly weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        current weather in ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      hi: {
        title: `विस्तारित मौसम पूर्वानुमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}:  15 दिनों का पूर्वानुमान ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
  
        description: `विस्तारित मौसम पूर्वानुमान
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : 15 दिनों का पूर्वानुमान प्राप्त करें
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        वर्तमान मौसम की स्थिति के साथ-साथ। मौसम के रुझान और अलर्ट के साथ-साथ प्रति घंटा, दैनिक और साप्ताहिक मौसम पूर्वानुमान भी प्राप्त करें
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `मौसम पूर्वानुमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        विस्तारित मौसम पूर्वानुमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
                     15 दिनों का मौसम पूर्वानुमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
                       साप्ताहिक मौसम पूर्वानुमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
                      वर्तमान मौसम ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      mr: {
        title: `साठी विस्तारित हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}:  १५ दिवसांचा अंदाज ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
  
        description: `साठी विस्तारित हवामान अंदाज
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
                  : १५ दिवसांचा अंदाज मिळवा
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
                    सध्याच्या हवामान परिस्थितीसह. तसेच तासाभराचा, दैनिक आणि आठवड्याचा हवामान अंदाज, हवामान ट्रेंड आणि सूचनांसह मिळवा
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `साठी हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
                    साठी विस्तारित हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
               १५ दिवसांचा हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
             आठवड्याचा हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        सध्याचे हवामान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      bn: {
        title: `বর্ধিত আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}:  ১৫ দিনের পূর্বাভাস ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
  
        description: `বর্ধিত আবহাওয়ার পূর্বাভাস
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
              : ১৫ দিনের পূর্বাভাস পান
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        বর্তমান আবহাওয়া পরিস্থিতি সহ। এছাড়াও প্রতি ঘণ্টা, দৈনিক এবং সাপ্তাহিক আবহাওয়ার পূর্বাভাস, আবহাওয়ার প্রবণতা এবং সতর্কতা সহ পান
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        বর্ধিত আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ১৫ দিনের আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        সাপ্তাহিক আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        বর্তমান আবহাওয়া ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      gu: {
        title: `માટે વિસ્તૃત હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}:  ૧૫ દિવસની આગાહી ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
  
        description: `માટે વિસ્તૃત હવામાન આગાહી
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
            : ૧૫ દિવસની આગાહી મેળવો
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        વર્તમાન હવામાન પરિસ્થિતિ સાથે. કલાકદીઠ, દૈનિક અને સાપ્તાહિક હવામાન આગાહી, હવામાન વલણો અને ચેતવણીઓ પણ મેળવો
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `માટે હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        માટે વિસ્તૃત હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ૧૫ દિવસ માટે હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        માટે સાપ્તાહિક હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        વર્તમાન હવામાન ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      ta: {
       title: `நீட்டிக்கப்பட்ட வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}:  15 நாட்கள் முன்னறிவிப்பு ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
  
        description: `நீட்டிக்கப்பட்ட வானிலை முன்னறிவிப்பு
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : 15 நாட்களுக்கான முன்னறிவிப்பைப் பெறுங்கள்.
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        தற்போதைய வானிலை நிலவரத்துடன். மணிநேர, தினசரி மற்றும் வாராந்திர வானிலை முன்னறிவிப்பு, வானிலை போக்குகள் மற்றும் எச்சரிக்கைகளுடன் பெறவும்.
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        நீட்டிக்கப்பட்ட வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 நாட்களுக்கு வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        வாராந்திர வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        தற்போதைய வானிலை ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      te: {
         title: `విస్తరించిన వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}:  15 రోజుల అంచనా ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
  
        description: `విస్తరించిన వాతావరణ సూచన
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : 15 రోజుల వాతావరణ సూచనను పొందండి
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ప్రస్తుత వాతావరణ పరిస్థితితో పాటు. గంట, రోజువారీ మరియు వారపు వాతావరణ సూచనలను, వాతావరణ ధోరణులు మరియు హెచ్చరికలతో పాటు పొందండి.
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `దీని వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        పొడిగించిన వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 రోజుల వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        వారపు వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ప్రస్తుత వాతావరణం ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      kn: {
        title: `ವಿಸ್ತೃತ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}:  15 ದಿನಗಳ ಮುನ್ಸೂಚನೆ ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
  
        description: `ವಿಸ್ತೃತ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : 15 ದಿನಗಳ ಮುನ್ಸೂಚನೆಯನ್ನು ಪಡೆಯಿರಿ
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ಪ್ರಸ್ತುತ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಯೊಂದಿಗೆ. ಗಂಟೆಯ, ದೈನಂದಿನ ಮತ್ತು ಸಾಪ್ತಾಹಿಕ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಯನ್ನು, ಹವಾಮಾನ ಪ್ರವೃತ್ತಿಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳೊಂದಿಗೆ ಪಡೆಯಿರಿ
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ವಿಸ್ತೃತ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ವಾರದ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ಪ್ರಸ್ತುತ ಹವಾಮಾನ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      ml: {
        title: `വിപുലീകൃത കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}:  15 ദിവസത്തെ പ്രവചനം ${obj.STATE_NAME
          }, ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
  
        description: `വിപുലീകൃത കാലാവസ്ഥാ പ്രവചനം
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : 15 ദിവസത്തെ പ്രവചനം നേടൂ
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        നിലവിലെ കാലാവസ്ഥാ സാഹചര്യത്തോടൊപ്പം. മണിക്കൂർ, ദൈനംദിന, ആഴ്ചതോറുമുള്ള കാലാവസ്ഥാ പ്രവചനങ്ങൾ, കാലാവസ്ഥാ ട്രെൻഡുകൾ, അലേർട്ടുകൾ എന്നിവയോടൊപ്പം നേടുക.
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}.`,
        keywords: `കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        വിപുലീകൃത കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 ദിവസത്തെ കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ആഴ്ചതോറുമുള്ള കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ഇപ്പോഴത്തെ കാലാവസ്ഥ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
    };
  
    return metaData[lng] || metaData['en'];
  };
  
  export const fifteen_days_forecast = (lng: any, obj: any) => {
    const metaData: any = {
      en: {
        title: `Extended or 15 days weather forecast for
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `Extended or 15 days weather forecast for
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : Get the extended or 15 days weather forecast for
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        along with current weather situation. Also get the hourly, daily and weekly weather forecast.`,
  
        keywords: `Weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        extended weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 days weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        weekly weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      hi: {
        title: `विस्तारित या 15 दिन का मौसम पूर्वानुमान
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `विस्तारित या 15 दिन का मौसम पूर्वानुमान
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : विस्तारित या 15 दिन का मौसम पूर्वानुमान प्राप्त करें
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        वर्तमान मौसम की स्थिति के साथ-साथ प्रति घंटा, दैनिक और साप्ताहिक मौसम पूर्वानुमान भी प्राप्त करें.`,
  
        keywords: `मौसम पूर्वानुमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        extended मौसम का पूर्वानुमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 दिनों का मौसम पूर्वानुमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        साप्ताहिक मौसम पूर्वानुमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      mr: {
        title: `साठी विस्तारित किंवा १५ दिवसांचा हवामान अंदाज
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `साठी विस्तारित किंवा १५ दिवसांचा हवामान अंदाज
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : साठी विस्तारित किंवा १५ दिवसांचा हवामान अंदाज मिळवा
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        सध्याच्या हवामान परिस्थितीसह. तसेच तासाभराचा, दररोजचा आणि आठवड्याचा हवामान अंदाज मिळवा.`,
  
        keywords: `साठी हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        साठी विस्तारित हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        १५ दिवसांचा हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        आठवड्याचा हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      bn: {
        title: `বর্ধিত বা ১৫ দিনের আবহাওয়ার পূর্বাভাস
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `বর্ধিত বা ১৫ দিনের আবহাওয়ার পূর্বাভাস
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : বর্ধিত বা ১৫ দিনের আবহাওয়ার পূর্বাভাস পান
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        বর্তমান আবহাওয়া পরিস্থিতি সহ। এছাড়াও প্রতি ঘণ্টা, দৈনিক এবং সাপ্তাহিক আবহাওয়ার পূর্বাভাস পান.`,
  
        keywords: `আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        বর্ধিত আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ১৫ দিনের আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        সাপ্তাহিক আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      gu: {
        title: `માટે વિસ્તૃત અથવા 15 દિવસની હવામાન આગાહી
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `માટે વિસ્તૃત અથવા 15 દિવસની હવામાન આગાહી
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : માટે વિસ્તૃત અથવા 15 દિવસની હવામાન આગાહી મેળવો
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        વર્તમાન હવામાન પરિસ્થિતિ સાથે. કલાકદીઠ, દૈનિક અને સાપ્તાહિક હવામાન આગાહી પણ મેળવો.`,
  
        keywords: `માટે હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        માટે વિસ્તૃત હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ૧૫ દિવસ માટે હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        માટે સાપ્તાહિક હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      ta: {
        title: `நீட்டிக்கப்பட்ட அல்லது 15 நாட்கள் வானிலை முன்னறிவிப்பு
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `நீட்டிக்கப்பட்ட அல்லது 15 நாட்கள் வானிலை முன்னறிவிப்பு
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : நீட்டிக்கப்பட்ட அல்லது 15 நாட்கள் வானிலை முன்னறிவிப்பைப் பெறுங்கள்.
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        தற்போதைய வானிலை நிலவரத்துடன். மணிநேர, தினசரி மற்றும் வாராந்திர வானிலை முன்னறிவிப்பையும் பெறுங்கள்..`,
  
        keywords: `வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        நீட்டிக்கப்பட்ட வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 நாட்களுக்கு வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        வாராந்திர வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      te: {
        title: `పొడిగించిన లేదా 15 రోజుల వాతావరణ సూచన
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `పొడిగించిన లేదా 15 రోజుల వాతావరణ సూచన
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : పొడిగించిన లేదా 15 రోజుల వాతావరణ సూచనను పొందండి
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ప్రస్తుత వాతావరణ పరిస్థితితో పాటు. గంట, రోజువారీ మరియు వారపు వాతావరణ సూచనను కూడా పొందండి..`,
  
        keywords: `దీని వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        పొడిగించిన వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 రోజుల వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        వారపు వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      kn: {
        title: `ವಿಸ್ತೃತ ಅಥವಾ 15 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `ವಿಸ್ತೃತ ಅಥವಾ 15 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : ವಿಸ್ತೃತ ಅಥವಾ 15 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಯನ್ನು ಪಡೆಯಿರಿ
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ಪ್ರಸ್ತುತ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಯೊಂದಿಗೆ. ಗಂಟೆಯ, ದೈನಂದಿನ ಮತ್ತು ಸಾಪ್ತಾಹಿಕ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಯನ್ನು ಸಹ ಪಡೆಯಿರಿ.`,
  
        keywords: `ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ವಿಸ್ತೃತ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ವಾರದ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      ml: {
        title: `വിപുലീകൃത അല്ലെങ്കിൽ 15 ദിവസത്തെ കാലാവസ്ഥാ പ്രവചനം
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `വിപുലീകൃത അല്ലെങ്കിൽ 15 ദിവസത്തെ കാലാവസ്ഥാ പ്രവചനം
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : ദീർഘിപ്പിച്ചതോ 15 ദിവസത്തെയോ കാലാവസ്ഥാ പ്രവചനം നേടുക.
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        നിലവിലെ കാലാവസ്ഥയോടൊപ്പം. മണിക്കൂർ, ദൈനംദിന, ആഴ്ചതോറുമുള്ള കാലാവസ്ഥാ പ്രവചനവും നേടുക.`,
  
        keywords: `കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        വിപുലീകൃത കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 ദിവസത്തെ കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ആഴ്ചതോറുമുള്ള കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
    };
  
    return metaData[lng] || metaData['en'];
  };
  
  export const weekly_forecast = (lng: any, obj: any) => {
    const metaData: any = {
      en: {
        title: `Weekly or 7 days weather forecast for
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `Weekly or 7 days weather forecast for
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : Get the weekly or 7 days weather forecast for
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        along with current, hourly, daily and extended forecast.`,
  
        keywords: `Weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        extended weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 days weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        weekly weather forecast for ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      hi: {
        title: `साप्ताहिक या 7 दिन का मौसम पूर्वानुमान
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `साप्ताहिक या 7 दिन का मौसम पूर्वानुमान
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : साप्ताहिक या 7 दिन का मौसम पूर्वानुमान प्राप्त करें
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        वर्तमान, प्रति घंटा, दैनिक और विस्तारित पूर्वानुमान के साथ.`,
  
        keywords: `मौसम पूर्वानुमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        विस्तारित मौसम पूर्वानुमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 दिनों का मौसम पूर्वानुमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        साप्ताहिक मौसम पूर्वानुमान ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      mr: {
        title: `साठी आठवड्याचा किंवा ७ दिवसांचा हवामान अंदाज
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `साठी आठवड्याचा किंवा ७ दिवसांचा हवामान अंदाज
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : साठी साप्ताहिक किंवा ७ दिवसांचा हवामान अंदाज मिळवा
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        चालू, तासाभराचा, दैनिक आणि विस्तारित अंदाजासह.`,
  
        keywords: `साठी हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        साठी विस्तारित हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        १५ दिवसांचा हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        आठवड्याचा हवामान अंदाज ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      bn: {
        title: `সাপ্তাহিক বা ৭ দিনের আবহাওয়ার পূর্বাভাস
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `সাপ্তাহিক বা ৭ দিনের আবহাওয়ার পূর্বাভাস
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : সাপ্তাহিক বা ৭ দিনের আবহাওয়ার পূর্বাভাস পান
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        বর্তমান, প্রতি ঘণ্টা, দৈনিক এবং বর্ধিত পূর্বাভাসের সাথে.`,
  
        keywords: `আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        বর্ধিত আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ১৫ দিনের আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        সাপ্তাহিক আবহাওয়ার পূর্বাভাস ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      gu: {
        title: `માટે સાપ્તાહિક અથવા 7 દિવસની હવામાન આગાહી
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `માટે સાપ્તાહિક અથવા 7 દિવસની હવામાન આગાહી
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : માટે સાપ્તાહિક અથવા 7 દિવસની હવામાન આગાહી મેળવો
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        વર્તમાન, કલાકદીઠ, દૈનિક અને વિસ્તૃત આગાહી સાથે.`,
  
        keywords: `માટે હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        માટે વિસ્તૃત હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ૧૫ દિવસ માટે હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        માટે સાપ્તાહિક હવામાન આગાહી ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      ta: {
        title: `வாராந்திர அல்லது 7 நாட்கள் வானிலை முன்னறிவிப்பு
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `வாராந்திர அல்லது 7 நாட்கள் வானிலை முன்னறிவிப்பு
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : வாராந்திர அல்லது 7 நாட்கள் வானிலை முன்னறிவிப்பைப் பெறுங்கள்.
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        தற்போதைய, மணிநேர, தினசரி மற்றும் நீட்டிக்கப்பட்ட முன்னறிவிப்புடன்.`,
  
        keywords: `வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        நீட்டிக்கப்பட்ட வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 நாட்களுக்கு வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        வாராந்திர வானிலை முன்னறிவிப்பு ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      te: {
        title: `వారం లేదా 7 రోజుల వాతావరణ సూచన
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `వారం లేదా 7 రోజుల వాతావరణ సూచన
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : వారం లేదా 7 రోజుల వాతావరణ సూచనను పొందండి
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ప్రస్తుత, గంటవారీ, రోజువారీ మరియు పొడిగించిన సూచనతో పాటు.`,
  
        keywords: `దీని వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        పొడిగించిన వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 రోజుల వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        వారపు వాతావరణ సూచన ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      kn: {
        title: `ವಾರದ ಅಥವಾ 7 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `ವಾರದ ಅಥವಾ 7 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : ವಾರದ ಅಥವಾ 7 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಯನ್ನು ಪಡೆಯಿರಿ
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ಪ್ರಸ್ತುತ, ಗಂಟೆಯ, ದೈನಂದಿನ ಮತ್ತು ವಿಸ್ತೃತ ಮುನ್ಸೂಚನೆಯೊಂದಿಗೆ.`,
  
        keywords: `ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ವಿಸ್ತೃತ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ವಾರದ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
      ml: {
        title: `ആഴ്ചതോറുമുള്ള അല്ലെങ്കിൽ 7 ദിവസത്തെ കാലാവസ്ഥാ പ്രവചനം
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}
        ${obj.STATE_NAME}`,
  
        description: `ആഴ്ചതോറുമുള്ള അല്ലെങ്കിൽ 7 ദിവസത്തെ കാലാവസ്ഥാ പ്രവചനം
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},${obj.STATE_NAME}
        : ആഴ്ചതോറുമുള്ള അല്ലെങ്കിൽ 7 ദിവസത്തെ കാലാവസ്ഥാ പ്രവചനം നേടുക.
        ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        നിലവിലെ, മണിക്കൂർ തോറും, ദിവസേനയുള്ളതും വിപുലീകൃതവുമായ പ്രവചനത്തോടൊപ്പം.`,
  
        keywords: `കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        വിപുലീകൃത കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        15 ദിവസത്തെ കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']},
        ആഴ്ചതോറുമുള്ള കാലാവസ്ഥാ പ്രവചനം ${obj[lng!='en' ? lng : 'TEHSIL_ALIAS_NAME']}`,
      },
    };
  
    return metaData[lng] || metaData['en'];
  };
  
  