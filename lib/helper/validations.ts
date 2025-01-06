export const countryCodes = [
    { code: '+1', name: 'USA' },
    { code: '+91', name: 'India' },
    { code: '+44', name: 'UK' },
    { code: '+61', name: 'Australia' },
    { code: '+86', name: 'China' },
    { code: '+33', name: 'France' },
    { code: '+49', name: 'Germany' },
    { code: '+81', name: 'Japan' },
    { code: '+7', name: 'Russia' },
    { code: '+52', name: 'Mexico' },
    { code: '+55', name: 'Brazil' },
    { code: '+39', name: 'Italy' },
    { code: '+34', name: 'Spain' },
    { code: '+82', name: 'South Korea' },
    { code: '+90', name: 'Turkey' },
    { code: '+31', name: 'Netherlands' },
    { code: '+46', name: 'Sweden' },
    { code: '+41', name: 'Switzerland' },
    { code: '+27', name: 'South Africa' },
    { code: '+54', name: 'Argentina' },
    { code: '+92', name: 'Pakistan' },
    { code: '+98', name: 'Iran' },
    { code: '+20', name: 'Egypt' },
    { code: '+966', name: 'Saudi Arabia' },
    { code: '+971', name: 'UAE' },
    { code: '+65', name: 'Singapore' },
    { code: '+60', name: 'Malaysia' },
    { code: '+63', name: 'Philippines' },
    { code: '+64', name: 'New Zealand' },
    { code: '+351', name: 'Portugal' },
    { code: '+358', name: 'Finland' },
    { code: '+47', name: 'Norway' },
    { code: '+45', name: 'Denmark' },
    { code: '+32', name: 'Belgium' },
    { code: '+43', name: 'Austria' },
    { code: '+48', name: 'Poland' },
    { code: '+36', name: 'Hungary' },
    { code: '+420', name: 'Czech Republic' },
    { code: '+353', name: 'Ireland' },
    { code: '+372', name: 'Estonia' },
    { code: '+370', name: 'Lithuania' },
    { code: '+371', name: 'Latvia' },
    { code: '+30', name: 'Greece' },
    { code: '+40', name: 'Romania' },
    { code: '+385', name: 'Croatia' },
    { code: '+386', name: 'Slovenia' },
    { code: '+421', name: 'Slovakia' },
    { code: '+389', name: 'North Macedonia' },
    { code: '+381', name: 'Serbia' },
    { code: '+382', name: 'Montenegro' },
    { code: '+387', name: 'Bosnia and Herzegovina' },
    { code: '+355', name: 'Albania' },
    { code: '+359', name: 'Bulgaria' },
    { code: '+373', name: 'Moldova' },
    { code: '+374', name: 'Armenia' },
    { code: '+375', name: 'Belarus' },
    { code: '+380', name: 'Ukraine' },
    { code: '+994', name: 'Azerbaijan' },
    { code: '+995', name: 'Georgia' },
    { code: '+976', name: 'Mongolia' },
    { code: '+977', name: 'Nepal' },
    { code: '+880', name: 'Bangladesh' },
    { code: '+94', name: 'Sri Lanka' },
    { code: '+95', name: 'Myanmar' },
    { code: '+84', name: 'Vietnam' },
    { code: '+66', name: 'Thailand' },
    { code: '+62', name: 'Indonesia' },
    { code: '+673', name: 'Brunei' },
    { code: '+855', name: 'Cambodia' },
    { code: '+856', name: 'Laos' },
    { code: '+670', name: 'Timor-Leste' },
    { code: '+672', name: 'Antarctica' },
    { code: '+93', name: 'Afghanistan' },
    { code: '+964', name: 'Iraq' },
    { code: '+962', name: 'Jordan' },
    { code: '+961', name: 'Lebanon' },
    { code: '+968', name: 'Oman' },
    { code: '+974', name: 'Qatar' },
    { code: '+967', name: 'Yemen' },
    { code: '+249', name: 'Sudan' },
    { code: '+252', name: 'Somalia' },
    { code: '+253', name: 'Djibouti' },
    { code: '+254', name: 'Kenya' },
    { code: '+255', name: 'Tanzania' },
    { code: '+256', name: 'Uganda' },
    { code: '+257', name: 'Burundi' },
    { code: '+258', name: 'Mozambique' },
    { code: '+260', name: 'Zambia' },
    { code: '+263', name: 'Zimbabwe' },
    { code: '+264', name: 'Namibia' },
    { code: '+267', name: 'Botswana' },
    { code: '+268', name: 'Eswatini' },
    { code: '+269', name: 'Comoros' },
    { code: '+291', name: 'Eritrea' },
    { code: '+298', name: 'Faroe Islands' },
    { code: '+299', name: 'Greenland' },
    { code: '+500', name: 'Falkland Islands' },
    { code: '+501', name: 'Belize' },
    { code: '+502', name: 'Guatemala' },
    { code: '+503', name: 'El Salvador' },
    { code: '+504', name: 'Honduras' },
    { code: '+505', name: 'Nicaragua' },
    { code: '+506', name: 'Costa Rica' },
    { code: '+507', name: 'Panama' },
    { code: '+509', name: 'Haiti' },
    { code: '+590', name: 'Guadeloupe' },
    { code: '+591', name: 'Bolivia' },
    { code: '+592', name: 'Guyana' },
    { code: '+593', name: 'Ecuador' },
    { code: '+594', name: 'French Guiana' },
    { code: '+595', name: 'Paraguay' },
    { code: '+596', name: 'Martinique' },
    { code: '+597', name: 'Suriname' },
    { code: '+598', name: 'Uruguay' },
    { code: '+599', name: 'Curaçao' },
    { code: '+670', name: 'Timor-Leste' },
    { code: '+672', name: 'Antarctica' },
  ];

  const validationRules: { [key: string]: RegExp } = {
    '+1': /^\d{10}$/, // USA: 10 digits
    '+91': /^\d{10}$/, // India: 10 digits
    '+44': /^\d{10}$/, // UK: 10 digits
    '+61': /^\d{9}$/, // Australia: 9 digits
    '+86': /^\d{11}$/, // China: 11 digits
    '+33': /^\d{9}$/, // France: 9 digits
    '+49': /^\d{10,11}$/, // Germany: 10-11 digits
    '+81': /^\d{10}$/, // Japan: 10 digits
    '+7': /^\d{10}$/, // Russia: 10 digits
    '+52': /^\d{10}$/, // Mexico: 10 digits
    '+55': /^\d{11}$/, // Brazil: 11 digits
    '+39': /^\d{10}$/, // Italy: 10 digits
    '+34': /^\d{9}$/, // Spain: 9 digits
    '+82': /^\d{10}$/, // South Korea: 10 digits
    '+90': /^\d{10}$/, // Turkey: 10 digits
    '+31': /^\d{9}$/, // Netherlands: 9 digits
    '+46': /^\d{9}$/, // Sweden: 9 digits
    '+41': /^\d{9}$/, // Switzerland: 9 digits
    '+27': /^\d{9}$/, // South Africa: 9 digits
    '+54': /^\d{10}$/, // Argentina: 10 digits
    '+92': /^\d{10}$/, // Pakistan: 10 digits
    '+98': /^\d{10}$/, // Iran: 10 digits
    '+20': /^\d{10}$/, // Egypt: 10 digits
    '+966': /^\d{9}$/, // Saudi Arabia: 9 digits
    '+971': /^\d{9}$/, // UAE: 9 digits
    '+65': /^\d{8}$/, // Singapore: 8 digits
    '+60': /^\d{9,10}$/, // Malaysia: 9-10 digits
    '+63': /^\d{10}$/, // Philippines: 10 digits
    '+64': /^\d{9,10}$/, // New Zealand: 9-10 digits
    '+351': /^\d{9}$/, // Portugal: 9 digits
    '+358': /^\d{9}$/, // Finland: 9 digits
    '+47': /^\d{8}$/, // Norway: 8 digits
    '+45': /^\d{8}$/, // Denmark: 8 digits
    '+32': /^\d{9}$/, // Belgium: 9 digits
    '+43': /^\d{10}$/, // Austria: 10 digits
    '+48': /^\d{9}$/, // Poland: 9 digits
    '+36': /^\d{9}$/, // Hungary: 9 digits
    '+420': /^\d{9}$/, // Czech Republic: 9 digits
    '+353': /^\d{9}$/, // Ireland: 9 digits
    '+372': /^\d{7,8}$/, // Estonia: 7-8 digits
    '+370': /^\d{8}$/, // Lithuania: 8 digits
    '+371': /^\d{8}$/, // Latvia: 8 digits
    '+30': /^\d{10}$/, // Greece: 10 digits
    '+40': /^\d{10}$/, // Romania: 10 digits
    '+385': /^\d{9}$/, // Croatia: 9 digits
    '+386': /^\d{8}$/, // Slovenia: 8 digits
    '+421': /^\d{9}$/, // Slovakia: 9 digits
    '+389': /^\d{8}$/, // North Macedonia: 8 digits
    '+381': /^\d{9}$/, // Serbia: 9 digits
    '+382': /^\d{8}$/, // Montenegro: 8 digits
    '+387': /^\d{8}$/, // Bosnia and Herzegovina: 8 digits
    '+355': /^\d{9}$/, // Albania: 9 digits
    '+359': /^\d{9}$/, // Bulgaria: 9 digits
    '+373': /^\d{8}$/, // Moldova: 8 digits
    '+374': /^\d{8}$/, // Armenia: 8 digits
    '+375': /^\d{9}$/, // Belarus: 9 digits
    '+380': /^\d{9}$/, // Ukraine: 9 digits
    '+994': /^\d{9}$/, // Azerbaijan: 9 digits
    '+995': /^\d{9}$/, // Georgia: 9 digits
    '+976': /^\d{8}$/, // Mongolia: 8 digits
    '+977': /^\d{10}$/, // Nepal: 10 digits
    '+880': /^\d{10}$/, // Bangladesh: 10 digits
    '+94': /^\d{9}$/, // Sri Lanka: 9 digits
    '+95': /^\d{8,9}$/, // Myanmar: 8-9 digits
    '+84': /^\d{9,10}$/, // Vietnam: 9-10 digits
    '+66': /^\d{9}$/, // Thailand: 9 digits
    '+62': /^\d{9,12}$/, // Indonesia: 9-12 digits
    '+673': /^\d{7}$/, // Brunei: 7 digits
    '+855': /^\d{8,9}$/, // Cambodia: 8-9 digits
    '+856': /^\d{8}$/, // Laos: 8 digits
    '+670': /^\d{7,8}$/, // Timor-Leste: 7-8 digits
    '+672': /^\d{5}$/, // Antarctica: 5 digits
    '+93': /^\d{9}$/, // Afghanistan: 9 digits
    '+964': /^\d{10}$/, // Iraq: 10 digits
    '+962': /^\d{9}$/, // Jordan: 9 digits
    '+961': /^\d{7,8}$/, // Lebanon: 7-8 digits
    '+968': /^\d{8}$/, // Oman: 8 digits
    '+974': /^\d{8}$/, // Qatar: 8 digits
    '+967': /^\d{9}$/, // Yemen: 9 digits
    '+249': /^\d{9}$/, // Sudan: 9 digits
    '+252': /^\d{7,8}$/, // Somalia: 7-8 digits
    '+253': /^\d{8}$/, // Djibouti: 8 digits
    '+254': /^\d{9}$/, // Kenya: 9 digits
    '+255': /^\d{9}$/, // Tanzania: 9 digits
    '+256': /^\d{9}$/, // Uganda: 9 digits
    '+257': /^\d{8}$/, // Burundi: 8 digits
    '+258': /^\d{9}$/, // Mozambique: 9 digits
    '+260': /^\d{9}$/, // Zambia: 9 digits
    '+263': /^\d{9}$/, // Zimbabwe: 9 digits
    '+264': /^\d{9}$/, // Namibia: 9 digits
    '+267': /^\d{8}$/, // Botswana: 8 digits
    '+268': /^\d{8}$/, // Eswatini: 8 digits
    '+269': /^\d{7}$/, // Comoros: 7 digits
    '+291': /^\d{7}$/, // Eritrea: 7 digits
    '+298': /^\d{6}$/, // Faroe Islands: 6 digits
    '+299': /^\d{6}$/, // Greenland: 6 digits
    '+500': /^\d{5}$/, // Falkland Islands: 5 digits
    '+501': /^\d{7}$/, // Belize: 7 digits
    '+502': /^\d{8}$/, // Guatemala: 8 digits
    '+503': /^\d{8}$/, // El Salvador: 8 digits
    '+504': /^\d{8}$/, // Honduras: 8 digits
    '+505': /^\d{8}$/, // Nicaragua: 8 digits
    '+506': /^\d{8}$/, // Costa Rica: 8 digits
    '+507': /^\d{8}$/, // Panama: 8 digits
    '+509': /^\d{8}$/, // Haiti: 8 digits
    '+590': /^\d{9}$/, // Guadeloupe: 9 digits
    '+591': /^\d{8}$/, // Bolivia: 8 digits
    '+592': /^\d{7}$/, // Guyana: 7 digits
    '+593': /^\d{9}$/, // Ecuador: 9 digits
    '+594': /^\d{9}$/, // French Guiana: 9 digits
    '+595': /^\d{9}$/, // Paraguay: 9 digits
    '+596': /^\d{9}$/, // Martinique: 9 digits
    '+597': /^\d{7}$/, // Suriname: 7 digits
    '+598': /^\d{8}$/, // Uruguay: 8 digits
    '+599': /^\d{7}$/, // Curaçao: 7 digits
  };

  export const validateMobile = (mobile: string, countryCode: string) => {
    const regex = validationRules[countryCode];
    return regex ? regex.test(mobile) : false;
  };