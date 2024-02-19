const defaultBankCallData = [
  {
    "totalAmount": -3000,
    "description": "BILL PAYMENT VIA FASTER PAYMENT TO MR JD CRYER REFERENCE SALARYDIV, MANDATE NO 0115 BANK TRANSFER DEBIT",
    "toFrom": "MR JD CRYER",
    "category": "Salary/Income",
    "date": "2023-01-01"
  },
  {
    "totalAmount": -191.22,
    "description": "DIRECT DEBIT PAYMENT TO AIMS REF 6589503250, MANDATE NO 0019 EXTERNAL DIRECT DEBIT",
    "toFrom": "AIMS",
    "category": "Utilities",
    "date": "2023-01-03"
  },
  {
    "totalAmount": -180,
    "description": "BILL PAYMENT VIA FASTER PAYMENT TO EIGER REFERENCE SAGELINK, MANDATE NO 47 BANK TRANSFER DEBIT",
    "toFrom": "EIGER",
    "category": "Subscriptions",
    "date": "2023-01-03"
  },
  {
    "totalAmount": -375.2,
    "description": "DIRECT DEBIT PAYMENT TO CREATIVE PENSION T REF CRTELEK01M1221228, MANDATE NO 0013 EXTERNAL DIRECT DEBIT",
    "toFrom": "CREATIVE PENSION T",
    "category": "Pension",
    "date": "2023-01-03"
  },
  {
    "totalAmount": -100,
    "description": "CARD PAYMENT TO PARCELBROKER ON 05-01-2023 OTT DEBIT",
    "toFrom": "PARCELBROKER",
    "category": "Shipping",
    "date": "2023-01-06"
  },
  {
    "totalAmount": 2822.4,
    "description": "FASTER PAYMENTS RECEIPT FROM XYLEM ANALYTICS UK LIMITED FASTER PAYMENT RECEIPT",
    "toFrom": "XYLEM ANALYTICS UK LIMITED",
    "category": "Income",
    "date": "2023-01-06"
  },
  {
    "totalAmount": -795,
    "description": "CARD PAYMENT TO 4D.FR ON 09-01-2023 OTT DEBIT",
    "toFrom": "4D.FR",
    "category": "Expenses",
    "date": "2023-01-10"
  },
  {
    "totalAmount": -404.6,
    "description": "CARD PAYMENT TO LNER WEB SALES ON 11-01-2023 OTT DEBIT",
    "toFrom": "LNER WEB SALES",
    "category": "Expenses",
    "date": "2023-01-12"
  },
  {
    "totalAmount": -104,
    "description": "CARD PAYMENT TO EXPEDIA ON 11-01-2023 OTT DEBIT",
    "toFrom": "EXPEDIA",
    "category": "Expenses",
    "date": "2023-01-12"
  },
  {
    "totalAmount": -170.43,
    "description": "CARD PAYMENT TO SSLDRAGON.COM, 206.00 USD, RATE 0.8273/[ ON 13-01-2023 OTT DEBIT",
    "toFrom": "SSLDRAGON.COM",
    "category": "Expenses",
    "date": "2023-01-13"
  },
  {
    "totalAmount": -5.03,
    "description": "FOREIGN CURRENCY CONVERSION FEE OTT DEBIT",
    "toFrom": "",
    "category": "Bank Fees",
    "date": "2023-01-13"
  },
  {
    "totalAmount": -7.99,
    "description": "CARD PAYMENT TO MICROSOFT*SUBSCRIPTION ON 15-01-2023 OTT DEBIT",
    "toFrom": "MICROSOFT*SUBSCRIPTION",
    "category": "Subscriptions",
    "date": "2023-01-15"
  },
  {
    "totalAmount": -22.28,
    "description": "DIRECT DEBIT PAYMENT TO EE LIMITED REF Q22779984387830381, MANDATE NO 0011 EXTERNAL DIRECT DEBIT",
    "toFrom": "EE LIMITED",
    "category": "Utilities",
    "date": "2023-01-16"
  },
  {
    "totalAmount": -126,
    "description": "CARD PAYMENT TO TRAINTICKETS.COM ON 16-01-2023 OTT DEBIT",
    "toFrom": "TRAINTICKETS.COM",
    "category": "Travel",
    "date": "2023-01-17"
  },
  {
    "totalAmount": -46.58,
    "description": "DIRECT DEBIT PAYMENT TO LUMINET REF 13480-13868-37, MANDATE NO 0020 EXTERNAL DIRECT DEBIT",
    "toFrom": "LUMINET",
    "category": "Utilities",
    "date": "2023-01-18"
  },
  {
    "totalAmount": -964.68,
    "description": "BILL PAYMENT VIA FASTER PAYMENT TO HMRCPAYE REFERENCE 419PG00171604 , MANDATE NO 0070 BANK TRANSFER DEBIT",
    "toFrom": "HMRCPAYE",
    "category": "Taxes",
    "date": "2023-01-19"
  },
  {
    "totalAmount": -394.59,
    "description": "DIRECT DEBIT PAYMENT TO TCONSULT TECHNOLOG REF JW35EEQ, MANDATE NO 0022 EXTERNAL DIRECT DEBIT",
    "toFrom": "TCONSULT TECHNOLOG",
    "category": "Professional Services",
    "date": "2023-01-19"
  },
  {
    "totalAmount": -11.16,
    "description": "CARD PAYMENT TO AMAZON.CO.UK*1A7VK0MR4 ON 19-01-2023 OTT DEBIT",
    "toFrom": "AMAZON.CO.UK",
    "category": "Office Supplies",
    "date": "2023-01-20"
  },
  {
    "totalAmount": -35.98,
    "description": "CARD PAYMENT TO COMPANIES MADE SIMPLE ON 20-01-2023 OTT DEBIT",
    "toFrom": "COMPANIES MADE SIMPLE",
    "category": "Professional Services",
    "date": "2023-01-21"
  },
  {
    "totalAmount": -28.79,
    "description": "CARD PAYMENT TO WP-XHOSTTELLNET LI ON 20-01-2023 OTT DEBIT",
    "toFrom": "WP-XHOSTTELLNET LI",
    "category": "Web Hosting",
    "date": "2023-01-21"
  },
  {
    "totalAmount": -48,
    "description": "DIRECT DEBIT PAYMENT TO VIRGIN MEDIA PYMTS REF 247148601001, MANDATE NO 0015 EXTERNAL DIRECT DEBIT",
    "toFrom": "VIRGIN MEDIA",
    "category": "Utilities",
    "date": "2023-01-23"
  },
  {
    "totalAmount": -0.79,
    "description": "CARD PAYMENT TO APPLE.COM/BILL ON 23-01-2023 OTT DEBIT",
    "toFrom": "APPLE.COM/BILL",
    "category": "Entertainment",
    "date": "2023-01-24"
  },
  {
    "totalAmount": -1796.06,
    "description": "BILL PAYMENT VIA FASTER PAYMENT TO STUART BISHOP REFERENCE TELEKINETIX, MANDATE NO 34 BANK TRANSFER DEBIT",
    "toFrom": "STUART BISHOP",
    "category": "Professional Services",
    "date": "2023-01-27"
  },
  {
    "totalAmount": -500,
    "description": "BILL PAYMENT VIA FASTER PAYMENT TO JOECRYER REFERENCE TKSALARY, MANDATE NO 103 BANK TRANSFER DEBIT",
    "toFrom": "JOECRYER",
    "category": "Payroll",
    "date": "2023-01-27"
  },
  {
    "totalAmount": -1571.71,
    "description": "CARD PAYMENT TO RAPIDSWITCH ON 26-01-2023 OTT DEBIT",
    "toFrom": "RAPIDSWITCH",
    "category": "Hosting Services",
    "date": "2023-01-27"
  },
  {
    "totalAmount": -2074.26,
    "description": "BILL PAYMENT VIA FASTER PAYMENT TO TOM BARTRAM REFERENCE TELEKINETIX , MANDATE NO 83 BANK TRANSFER DEBIT",
    "toFrom": "TOM BARTRAM",
    "category": "Bank Transfer Debit",
    "date": "2023-01-27"
  },
  {
    "totalAmount": -1062,
    "description": "BILL PAYMENT VIA FASTER PAYMENT TO FORMKRAFT REFERENCE TKLLABELS , MANDATE NO 121 BANK TRANSFER DEBIT",
    "toFrom": "FORMKRAFT",
    "category": "Bank Transfer Debit",
    "date": "2023-01-27"
  },
  {
    "totalAmount": -3.24,
    "description": "CARD PAYMENT TO GITHUB ,4.00 USD, RATE 0.8100/[ ON 28-01-2023 OTT DEBIT",
    "toFrom": "GITHUB",
    "category": "Card Payment Debit",
    "date": "2023-01-29"
  },
  {
    "totalAmount": -11.04,
    "description": "CARD PAYMENT TO AMAZON.CO.UK*1O3AV3VL4 ON 29-01-2023 OTT DEBIT",
    "toFrom": "AMAZON.CO.UK",
    "category": "Card Payment Debit",
    "date": "2023-01-30"
  },
  {
    "totalAmount": 1260,
    "description": "FASTER PAYMENTS RECEIPT REF.INV 1492 FROM I.LEVEL SOFT FASTER PAYMENT RECEIPT",
    "toFrom": "I.LEVEL SOFT",
    "category": "Faster Payment Receipt",
    "date": "2023-01-31"
  },
  {
    "totalAmount": 3132,
    "description": "FASTER PAYMENTS RECEIPT REF.INV 1491 FROM I.LEVEL SOFT",
    "toFrom": "I.LEVEL SOFT",
    "category": "FASTER PAYMENT RECEIPT",
    "date": "2023-01-31"
  },
  {
    "totalAmount": 430.2,
    "description": "FASTER PAYMENTS RECEIPT REF.INV 1493 FROM I.LEVEL SOFT",
    "toFrom": "I.LEVEL SOFT",
    "category": "FASTER PAYMENT RECEIPT",
    "date": "2023-01-31"
  },
  {
    "totalAmount": 2220,
    "description": "FASTER PAYMENTS RECEIPT REF.INV 1490 FROM I.LEVEL SOFT",
    "toFrom": "I.LEVEL SOFT",
    "category": "FASTER PAYMENT RECEIPT",
    "date": "2023-01-31"
  },
  {
    "totalAmount": 10080,
    "description": "FASTER PAYMENTS RECEIPT REF.INV 1489 FROM I.LEVEL SOFT",
    "toFrom": "I.LEVEL SOFT",
    "category": "FASTER PAYMENT RECEIPT",
    "date": "2023-01-31"
  }
];


const defaultReceiptData = [
  {
    "totalAmount": 1571.71,
    "description": "RS Dedicated Server, Dedicated Server, Cisco ASA 5515 Firewall, PowerEdge R430 3.5\" Bay, PowerEdge R420 3.5\" Bay, and various configurations.",
    "toFrom": "Telekinetix Limited",
    "category": "IT and Hosting Services",
    "date": "2023-01-01"
  },
  {
    "totalAmount": 952.89,
    "description": "Renewal of Partner Program Silver 2022 (FR21-906270310)",
    "toFrom": "Telekinetix Limited",
    "category": "Professional Services",
    "date": "2022-01-24"
  }
];

export { defaultBankCallData, defaultReceiptData };


