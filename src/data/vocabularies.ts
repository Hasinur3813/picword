import type { IVocabulary } from "@/types";

/** Mock vocabulary catalog for browse UI (replace with API later) */
export const VOCABULARIES: IVocabulary[] = [
  {
    _id: "1",
    word: "Ephemeral",
    phonetic: "/ɪˈfemərəl/",
    description: "Something that lasts only a brief moment before fading away.",
    englishMeaning: "Lasting for a very short time",
    bengaliMeaning: "ক্ষণস্থায়ী",
    englishMeaningBengali: "খুব অল্প সময়ের জন্য স্থায়ী থাকা বা ক্ষণস্থায়ী হওয়া",
    bengaliDetails:
      "শব্দটি দিয়ে এমন ঘটনা, বস্তু বা অনুভূতি বোঝানো হয় যা দ্রুত মিলিয়ে যায়। দৈনন্দিন জীবনে ক্ষণস্থায়ী ফুল, মেঘের সৌন্দর্য কিংবা ক্ষণিকের সুখের অনুভূতি বর্ণনা করতে এটি চমৎকার একটি শব্দ।",
    exampleSentence:
      "The beauty of cherry blossoms is ephemeral, lasting only a few days each spring.",
    exampleSentenceBengali:
      "চেরি ফুলের সৌন্দর্য ক্ষণস্থায়ী, যা প্রতি বসন্তে মাত্র কয়েক দিনের জন্য টিকে থাকে।",
    synonyms: ["Fleeting", "Transient", "Momentary"],
    antonyms: ["Permanent", "Enduring"],
    imageUrl:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=400&fit=crop",
    category: "nature",
    difficulty: "advanced",
    createdAt: new Date("2026-03-01"),
  },
  {
    _id: "2",
    word: "Resilient",
    phonetic: "/rɪˈzɪliənt/",
    description: "Able to recover quickly from difficulty or bounce back stronger.",
    englishMeaning: "Able to withstand or recover quickly from adversity",
    bengaliMeaning: "সহনশীল / স্থিতিস্থাপক",
    englishMeaningBengali: "প্রতিকূলতা মোকাবেলা করে দ্রুত ঘুরে দাঁড়াতে বা মানিয়ে নিতে সক্ষম",
    bengaliDetails:
      "যেকোনো বাধা বা কঠিন পরিস্থিতির পর যারা সহজে ভেঙে না পড়ে পুনরায় শক্ত হয়ে দাঁড়ায়, তাদের Resilient বলা হয়। এটি মনোবল এবং মানসিক শক্তি প্রকাশে ব্যবহৃত হয়।",
    exampleSentence:
      "She remained resilient through every setback during her exam preparation.",
    exampleSentenceBengali:
      "পরীক্ষার প্রস্তুতিতে প্রতিটি বাধার মধ্যেও সে মানসিক শক্তিতে অবিচল ছিল।",
    synonyms: ["Tough", "Durable", "Adaptive"],
    antonyms: ["Fragile", "Weak"],
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    category: "emotions",
    difficulty: "intermediate",
    createdAt: new Date("2026-03-02"),
  },
  {
    _id: "3",
    word: "Collaborate",
    phonetic: "/kəˈlæbəreɪt/",
    description: "Work together with others toward a shared goal.",
    englishMeaning: "To work jointly on an activity or project",
    bengaliMeaning: "সহযোগিতা করা",
    englishMeaningBengali: "একটি যৌথ লক্ষ্য অর্জনে একাধিক ব্যক্তি বা দলের একসঙ্গে কাজ করা",
    bengaliDetails:
      "ব্যবসায়িক ক্ষেত্র, গবেষণা বা যেকোনো যৌথ কাজের ক্ষেত্রে সবার সম্মিলিত প্রচেষ্টায় কিছু তৈরি করার প্রক্রিয়াকে Collaborate বলে।",
    exampleSentence:
      "The two teams will collaborate on the new product launch next quarter.",
    exampleSentenceBengali:
      "দুটি টিম আগামী কোয়ার্টারে নতুন পণ্য চালুর জন্য যৌথভাবে কাজ করবে।",
    synonyms: ["Cooperate", "Partner", "Unite"],
    antonyms: ["Compete", "Conflict"],
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    category: "business",
    difficulty: "beginner",
    createdAt: new Date("2026-03-03"),
  },
  {
    _id: "4",
    word: "Algorithm",
    phonetic: "/ˈælɡərɪðəm/",
    description: "A clear set of steps a computer follows to solve a problem.",
    englishMeaning: "A process or set of rules used in calculations or problem-solving",
    bengaliMeaning: "অ্যালগরিদম / সমাধান পদ্ধতি",
    englishMeaningBengali: "কোনো নির্দিষ্ট সমস্যা সমাধানের জন্য কম্পিউটারের অনুসরণ করা ধাপে ধাপে নিয়মাবলী",
    bengaliDetails:
      "প্রযুক্তি এবং গণিতে Algorithm হলো সঠিক উত্তর বা ফল পেতে নির্দিষ্ট ধারাবাহিক ধাপ অনুসরণ করার পদ্ধতি। যেমন সার্চ ইঞ্জিন যেভাবে সঠিক ফলাফল খুঁজে দেয়।",
    exampleSentence:
      "The search algorithm ranks pages based on relevance and authority.",
    exampleSentenceBengali:
      "সার্চ অ্যালগরিদম প্রাসঙ্গিকতা এবং নির্ভরযোগ্যতার ভিত্তিতে ওয়েব পেজগুলোকে সাজায়।",
    synonyms: ["Procedure", "Formula", "Method"],
    antonyms: [],
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    category: "technology",
    difficulty: "intermediate",
    createdAt: new Date("2026-03-04"),
  },
  {
    _id: "5",
    word: "Hypothesis",
    phonetic: "/haɪˈpɑːθəsɪs/",
    description: "An educated guess you test with evidence and research.",
    englishMeaning: "A proposed explanation made as a starting point for investigation",
    bengaliMeaning: "অনুমান / প্রকল্পনা",
    englishMeaningBengali: "পরীক্ষা ও গবেষণার সূচনা হিসেবে গৃহীত কোনো প্রাথমিক ধারণা বা অনুমান",
    bengaliDetails:
      "বিজ্ঞানে বা গবেষণায় কোনো ঘটনা নিশ্চিত হওয়ার আগে যে যুক্তিযুক্ত অনুমান করা হয়, তাকে Hypothesis বলে। এটি প্রমাণের মাধ্যমে সত্য বা মিথ্যা নির্ধারিত হয়।",
    exampleSentence:
      "Her hypothesis about sleep and memory was supported by the lab results.",
    exampleSentenceBengali:
      "ঘুম এবং স্মৃতির সম্পর্ক নিয়ে তার অনুমানটি ল্যাব ফলাফলের মাধ্যমে সমর্থিত হয়েছিল।",
    synonyms: ["Theory", "Assumption", "Proposition"],
    antonyms: ["Fact", "Certainty"],
    imageUrl:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
    category: "academic",
    difficulty: "intermediate",
    createdAt: new Date("2026-03-05"),
  },
  {
    _id: "6",
    word: "Gratitude",
    phonetic: "/ˈɡrætɪtuːd/",
    description: "A warm feeling of thankfulness for what you have or receive.",
    englishMeaning: "The quality of being thankful; readiness to show appreciation",
    bengaliMeaning: "কৃতজ্ঞতা",
    englishMeaningBengali: "কারো থেকে পাওয়া সাহায্য বা সুন্দর কিছু অর্জনের জন্য আন্তরিক কৃতজ্ঞতা প্রকাশের মানসিকতা",
    bengaliDetails:
      "জীবন ও মানুষের প্রতি ধন্যবাদ জানানোর ইতিবাচক অনুভূতির নাম Gratitude। এই গুণটি মানসিক শান্তি বাড়ায় এবং ইতিবাচক দৃষ্টিভঙ্গি তৈরি করে।",
    exampleSentence:
      "He wrote a short note of gratitude to everyone who helped him prepare.",
    exampleSentenceBengali:
      "তাকে প্রস্তুতিতে সাহায্য করা প্রত্যককে সে একটি ছোট ধন্যবাদবার্তা পাঠিয়েছে।",
    synonyms: ["Thankfulness", "Appreciation", "Recognition"],
    antonyms: ["Ingratitude", "Discontent"],
    imageUrl:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=400&fit=crop",
    category: "emotions",
    difficulty: "beginner",
    createdAt: new Date("2026-03-06"),
  },
  {
    _id: "7",
    word: "Itinerary",
    phonetic: "/aɪˈtɪnəreri/",
    description: "A planned route or schedule for a trip, day by day.",
    englishMeaning: "A planned route or journey; a travel schedule",
    bengaliMeaning: "ভ্রমণসূচি",
    englishMeaningBengali: "কোনো ভ্রমণের দিনভিত্তিক পরিকল্পিত রুট এবং কাজের সময়সূচি",
    bengaliDetails:
      "ভ্রমণে কোথায় কোথায় যাবেন, কোথায় থাকবেন এবং কখন কি করবেন তা সুন্দরভাবে তৈরি করা ভ্রমণসূচিকে Itinerary বলে।",
    exampleSentence:
      "Our itinerary includes two days in Kyoto and one free afternoon in Osaka.",
    exampleSentenceBengali:
      "আমাদের ভ্রমণসূচিতে কিয়োটোতে দুই দিন এবং ওসাকায় একটি মুক্ত বিকেল অন্তর্ভুক্ত রয়েছে।",
    synonyms: ["Schedule", "Agenda", "Route"],
    antonyms: [],
    imageUrl:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
    category: "travel",
    difficulty: "intermediate",
    createdAt: new Date("2026-03-07"),
  },
  {
    _id: "8",
    word: "Nourish",
    phonetic: "/ˈnɜːrɪʃ/",
    description: "Provide the food or care needed for health and growth.",
    englishMeaning: "To provide with the food or other substances necessary for growth",
    bengaliMeaning: "পুষ্টি জোগানো",
    englishMeaningBengali: "শরীরের বৃদ্ধি, সুস্থতা এবং মনের বিকাশের জন্য প্রয়োজনীয় খাদ্য ও যত্ন প্রদান করা",
    bengaliDetails:
      "শুধু পেট ভরানো নয়, শরীর ও মস্তিষ্ককে পুষ্টি জুগিয়ে সুস্থ ও কর্মক্ষম রাখাকে Nourish করা বলে।",
    exampleSentence:
      "A balanced breakfast can nourish both body and focus for the morning.",
    exampleSentenceBengali:
      "একটি সুষম প্রাতরাশ সকালে শরীর এবং মনোযোগ উভয়কেই প্রয়োজনীয় পুষ্টি যোগাতে পারে।",
    synonyms: ["Feed", "Sustain", "Strengthen"],
    antonyms: ["Starve", "Deprive"],
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    category: "health",
    difficulty: "beginner",
    createdAt: new Date("2026-03-08"),
  },
  {
    _id: "9",
    word: "Serendipity",
    phonetic: "/ˌserənˈdɪpɪti/",
    description: "A pleasant surprise that happens when you weren’t looking for it.",
    englishMeaning: "The occurrence of events by chance in a happy or beneficial way",
    bengaliMeaning: "আকস্মিক সৌভাগ্য",
    englishMeaningBengali: "কোনো প্রত্যাশা ছাড়াই হঠাৎ ঘটে যাওয়া সুসংবাদ বা আনন্দদায়ক ঘটনা",
    bengaliDetails:
      "আপনি একটি জিনিস খুঁজছিলেন না, কিন্তু কাকতালীয়ভাবে খুব ভালো একটি জিনিস পেয়ে গেলেন — এই আকস্মিক ও সুন্দর ভাগ্যকে Serendipity বলা হয়।",
    exampleSentence:
      "Meeting her future mentor at the café was pure serendipity.",
    exampleSentenceBengali:
      "ক্যাফেতে নিজের ভবিষ্যৎ মেন্টরের সাথে দেখা হওয়াটা ছিল সম্পূর্ণ আকস্মিক সৌভাগ্য।",
    synonyms: ["Chance", "Fortune", "Luck"],
    antonyms: ["Misfortune", "Design"],
    imageUrl:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop",
    category: "daily-life",
    difficulty: "advanced",
    createdAt: new Date("2026-03-09"),
  },
  {
    _id: "10",
    word: "Negotiate",
    phonetic: "/nɪˈɡoʊʃieɪt/",
    description: "Discuss terms carefully to reach an agreement both sides accept.",
    englishMeaning: "To try to reach an agreement through discussion",
    bengaliMeaning: "আলোচনা / দরকষাকষি করা",
    englishMeaningBengali: "আলোচনার মাধ্যমে উভয় পক্ষের গ্রহণযোগ্য একটি সিদ্ধান্তে পৌঁছানোর চেষ্টা করা",
    bengaliDetails:
      "ব্যবসা বা সম্পর্কের মধ্যে যেকোনো মতভেদ কমিয়ে সুবিধাজনক সমঝোতায় পৌঁছানোর আলোচনা প্রক্রিয়াকে Negotiate বলে।",
    exampleSentence:
      "They negotiated a flexible deadline that worked for both teams.",
    exampleSentenceBengali:
      "তারা উভয় টিমের জন্য সুবিধাজনক একটি নমনীয় শেষ সময়সীমা নিয়ে আলোচনা করে ঠিক করেছে।",
    synonyms: ["Bargain", "Discuss", "Settle"],
    antonyms: ["Demand", "Dictate"],
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
    category: "business",
    difficulty: "intermediate",
    createdAt: new Date("2026-03-10"),
  },
  {
    _id: "11",
    word: "Illuminate",
    phonetic: "/ɪˈluːmɪneɪt/",
    description: "Light something up — or make an idea clearer to understand.",
    englishMeaning: "To light up; to help clarify or explain",
    bengaliMeaning: "আলোকিত করা / স্পষ্ট করা",
    englishMeaningBengali: "আলো দিয়ে উদ্ভাসিত করা অথবা কোনো জটিল বিষয়কে সহজ ব্যাখ্যায় স্পষ্ট করে তোলা",
    bengaliDetails:
      "অন্ধকার ঘরে আলো জ্বালাতেও এটি ব্যবহৃত হয়, আবার জটিল কোনো বিষয়কে স্পষ্ট ও সহজবোধ্য করে ব্যাখ্যা করা বোঝাতেও Illuminate শব্দটি দারুণ।",
    exampleSentence:
      "The diagram helped illuminate a concept that felt abstract before.",
    exampleSentenceBengali:
      "ডায়াগ্রামটি পূর্বে জটিল মনে হওয়া একটি ধারণাকে স্পষ্ট করে তুলতে সাহায্য করেছিল।",
    synonyms: ["Clarify", "Brighten", "Explain"],
    antonyms: ["Obscure", "Darken"],
    imageUrl:
      "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=600&h=400&fit=crop",
    category: "academic",
    difficulty: "intermediate",
    createdAt: new Date("2026-03-11"),
  },
  {
    _id: "12",
    word: "Interface",
    phonetic: "/ˈɪntərfeɪs/",
    description: "The surface where a user and a system meet and interact.",
    englishMeaning: "A point where two systems meet and interact",
    bengaliMeaning: "ইন্টারফেস / সংযোগতল",
    englishMeaningBengali: "ব্যবহারকারী এবং কম্পিউটার বা ব্যবস্থার যোগাযোগের সংযোগস্থল",
    bengaliDetails:
      "অ্যাপ বা ওয়েবসাইটের স্ক্রিন যেখানে ব্যবহারকারী ক্লিক করে কাজ সম্পাদন করে তা হলো ইউজার ইন্টারফেস (UI)। এটি মানুষের সাথে প্রযুক্তিকে যুক্ত করে।",
    exampleSentence:
      "A clean interface reduces friction when learners browse new words.",
    exampleSentenceBengali:
      "একটি পরিচ্ছন্ন ইন্টারফেস শিক্ষার্থীদের নতুন শব্দ খোঁজার সময় অসুবিধা দূর করে।",
    synonyms: ["Connection", "Portal", "Dashboard"],
    antonyms: [],
    imageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
    category: "technology",
    difficulty: "beginner",
    createdAt: new Date("2026-03-12"),
  },
  {
    _id: "13",
    word: "Melancholy",
    phonetic: "/ˈmelənkɑːli/",
    description: "A soft, thoughtful sadness that settles in quietly.",
    englishMeaning: "A feeling of pensive sadness, typically with no obvious cause",
    bengaliMeaning: "বিষণ্ণতা / বিষাদ",
    englishMeaningBengali: "কোনো নির্দিষ্ট কারণ ছাড়াই মনের ভেতরে জমে থাকা এক ধরনের নিবিড় ও গভীর বিষাদ",
    bengaliDetails:
      "তীক্ষ্ণ কোনো কষ্ট নয়, বরং বৃষ্টিভেজা দিনে বা পুরানো স্মৃতির টানে মনের গহীনে যে মৃদু ও চিন্তাশীল মন খারাপের অনুভূতি তৈরি হয়, তাকে Melancholy বলে।",
    exampleSentence:
      "A quiet melancholy filled the room as the rain tapped the windows.",
    exampleSentenceBengali:
      "জানালায় বৃষ্টির ফোঁটা পড়ার সাথে সাথে ঘরে এক শান্ত বিষাদ ছেয়ে গেল।",
    synonyms: ["Sadness", "Gloom", "Sorrow"],
    antonyms: ["Joy", "Cheer"],
    imageUrl:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
    category: "emotions",
    difficulty: "advanced",
    createdAt: new Date("2026-03-13"),
  },
  {
    _id: "14",
    word: "Bloom",
    phonetic: "/bluːm/",
    description: "To flower — or to grow and flourish at the right time.",
    englishMeaning: "To produce flowers; to come into full development",
    bengaliMeaning: "প্রস্ফুটিত হওয়া",
    englishMeaningBengali: "ফুল ফোটা বা সঠিক পরিচর্যায় পূর্ণ বিকাশ লাভ করা",
    bengaliDetails:
      "গাছে ফুল ফোটার পাশাপাশি কোনো মানুষের দক্ষতা, আত্মবিশ্বাস বা ব্যক্তিত্ব পুরোপুরি বিকশিত হওয়াকেও Bloom বলা হয়।",
    exampleSentence:
      "Confidence can bloom when practice becomes a daily habit.",
    exampleSentenceBengali:
      "নিয়মিত অনুশীলন দৈনন্দিন অভ্যাসে পরিণত হলে আত্মবিশ্বাস বিকশিত হতে পারে।",
    synonyms: ["Flower", "Flourish", "Thrive"],
    antonyms: ["Wither", "Fade"],
    imageUrl:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=400&fit=crop",
    category: "nature",
    difficulty: "beginner",
    createdAt: new Date("2026-03-14"),
  },
  {
    _id: "15",
    word: "Passport",
    phonetic: "/ˈpæspɔːrt/",
    description: "An official document that lets you travel across borders.",
    englishMeaning: "An official document issued for international travel",
    bengaliMeaning: "পাসপোর্ট",
    englishMeaningBengali: "আন্তর্জাতিক ভ্রমণের জন্য সরকার কর্তৃক ইস্যুকৃত একটি সরকারি পরিচয়পত্র",
    bengaliDetails:
      "এক দেশ থেকে অন্য দেশে যেতে এবং আন্তর্জাতিকভাবে নাগরিক পরিচয় নিশ্চিত করতে পাসপোর্ট অপরিহার্য।",
    exampleSentence:
      "She checked her passport twice before leaving for the airport.",
    exampleSentenceBengali:
      "বিমানবন্দরের উদ্দেশ্যে বের হওয়ার আগে সে তার পাসপোর্ট দুইবার পরীক্ষা করে দেখেছিল।",
    synonyms: ["Travel document", "ID"],
    antonyms: [],
    imageUrl:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop",
    category: "travel",
    difficulty: "beginner",
    createdAt: new Date("2026-03-15"),
  },
  {
    _id: "16",
    word: "Hydration",
    phonetic: "/haɪˈdreɪʃən/",
    description: "Keeping your body supplied with enough water to stay well.",
    englishMeaning: "The process of causing something to absorb water",
    bengaliMeaning: "জলীয়করণ / পানি গ্রহণ",
    englishMeaningBengali: "শরীরে পানির প্রয়োজনীয় পরিমাণ বজায় রাখা",
    bengaliDetails:
      "পর্যাপ্ত পানি পান করে শরীরকে সতেজ ও সুস্থ রাখার প্রক্রিয়াকে Hydration বলা হয়, যা মস্তিষ্ক ও ত্বককে কর্মক্ষম রাখে।",
    exampleSentence:
      "Proper hydration before study sessions keeps focus sharper for longer.",
    exampleSentenceBengali:
      "পড়াশোনার আগে সঠিক মাত্রায় পানি পান করা মনোযোগকে দীর্ঘ সময় তীক্ষ্ণ রাখে।",
    synonyms: ["Moistening", "Watering"],
    antonyms: ["Dehydration"],
    imageUrl:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=400&fit=crop",
    category: "health",
    difficulty: "beginner",
    createdAt: new Date("2026-03-16"),
  },
  {
    _id: "17",
    word: "Routine",
    phonetic: "/ruːˈtiːn/",
    description: "A familiar sequence of actions you repeat each day.",
    englishMeaning: "A sequence of actions regularly followed",
    bengaliMeaning: "নিয়মিত রুটিন / অভ্যাস",
    englishMeaningBengali: "প্রতিদিন নিয়মিতভাবে মেনে চলা নির্দিষ্ট কাজের অনুক্রম বা অভ্যাস",
    bengaliDetails:
      "দৈনন্দিন সুনির্দিষ্ট শৃঙ্খলা যা অভ্যাসে পরিণত হয়। ভালো রুটিন শেখার গতি বাড়ায় এবং সময় বাঁচায়।",
    exampleSentence:
      "A short evening routine of five new words made learning feel effortless.",
    exampleSentenceBengali:
      "সন্ধ্যায় পাঁচটি নতুন শব্দের একটি ছোট রুটিন শিক্ষাকে একদম সহজ করে তুলেছে।",
    synonyms: ["Habit", "Schedule", "Pattern"],
    antonyms: ["Chaos", "Irregularity"],
    imageUrl:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
    category: "daily-life",
    difficulty: "beginner",
    createdAt: new Date("2026-03-17"),
  },
  {
    _id: "18",
    word: "Analyze",
    phonetic: "/ˈænəlaɪz/",
    description: "Break something down carefully to understand how it works.",
    englishMeaning: "To examine something in detail to explain or interpret it",
    bengaliMeaning: "বিশ্লেষণ করা",
    englishMeaningBengali: "কোনো বিষয়কে ভালোভাবে বোঝার জন্য তার উপাদানগুলোকে পুঙ্খানুপুঙ্খভাবে পরীক্ষা করা",
    bengaliDetails:
      "কোনো তথ্য বা বাক্যের গভীরে গিয়ে প্রতিটি অংশের অর্থ ও গঠন খতিয়ে দেখার কাজকে Analyze বলে।",
    exampleSentence:
      "Students analyze each sentence to notice how new vocabulary is used.",
    exampleSentenceBengali:
      "নতুন শব্দের ব্যবহার লক্ষ্য করার জন্য শিক্ষার্থীরা প্রতিটি বাক্য মনোযোগ দিয়ে বিশ্লেষণ করে।",
    synonyms: ["Examine", "Study", "Inspect"],
    antonyms: ["Ignore", "Overlook"],
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    category: "academic",
    difficulty: "beginner",
    createdAt: new Date("2026-03-18"),
  },
  {
    _id: "19",
    word: "Bandwidth",
    phonetic: "/ˈbændwɪdθ/",
    description: "Capacity to transfer data — or mental capacity to take on more.",
    englishMeaning: "The capacity for data transfer; informal: available capacity",
    bengaliMeaning: "ব্যান্ডউইথ / ধারণক্ষমতা",
    englishMeaningBengali: "উপাত্ত স্থানান্তরের পরিমাপ বা মানসিকভাবে অতিরিক্ত কাজ সামলানোর সামর্থ্য",
    bengaliDetails:
      "ইন্টারনেটের স্পিড ছাড়াও কথ্য ভাষায় মানসিক চাপ ও নতুন কাজ নেওয়ার শারীরিক বা মানসিক সক্ষমতাকে Bandwidth বলা হয়।",
    exampleSentence:
      "She didn’t have the bandwidth for another meeting after a long sprint.",
    exampleSentenceBengali:
      "দীর্ঘ স্প্রিন্টের পর তার আরেকটি মিটিংয়ে অংশ নেওয়ার মত মানসিক সামর্থ্য ছিল না।",
    synonyms: ["Capacity", "Throughput", "Room"],
    antonyms: [],
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    category: "technology",
    difficulty: "advanced",
    createdAt: new Date("2026-03-19"),
  },
  {
    _id: "20",
    word: "Deadline",
    phonetic: "/ˈdedlaɪn/",
    description: "The latest time by which something must be finished.",
    englishMeaning: "The latest time or date by which something should be completed",
    bengaliMeaning: "শেষ সময়সীমা",
    englishMeaningBengali: "কোনো কাজ শেষ করার জন্য নির্ধারিত সর্বশেষ সময় বা তারিখ",
    bengaliDetails:
      "যেকোনো প্রজেক্ট, অ্যাসাইনমেন্ট বা সাবমিশনের শেষ সীমা যার পরে কাজ জমা নেওয়া হয় না।",
    exampleSentence:
      "They finished the proposal two hours before the deadline.",
    exampleSentenceBengali:
      "তারা শেষ সময়সীমার দুই ঘণ্টা আগেই প্রস্তাবনাটি শেষ করেছিল।",
    synonyms: ["Due date", "Time limit", "Cutoff"],
    antonyms: ["Extension"],
    imageUrl:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=400&fit=crop",
    category: "business",
    difficulty: "beginner",
    createdAt: new Date("2026-03-20"),
  },
  {
    _id: "21",
    word: "Wanderlust",
    phonetic: "/ˈwɑːndərlʌst/",
    description: "A strong desire to explore new places and keep moving.",
    englishMeaning: "A strong desire to travel and explore the world",
    bengaliMeaning: "ভ্রমণপিপাসা",
    englishMeaningBengali: "নতুন নতুন স্থান ভ্রমণ ও পৃথিবী ঘুরে দেখার এক অদম্য আকুলতা",
    bengaliDetails:
      "মন যখন এক জায়গায় স্থির না থেকে অচেনা সব জায়গা ও সংস্কৃতি আবিষ্কারের জন্য উন্মুখ হয়ে থাকে, সেই প্রবালের নাম Wanderlust।",
    exampleSentence:
      "Wanderlust pulled him toward quieter towns after years in the city.",
    exampleSentenceBengali:
      "বছরের পর বছর শহরে থাকার পর প্রবল ভ্রমণপিপাসা তাকে শান্ত ছোট শহরের দিকে টেনে নিয়ে গেল।",
    synonyms: ["Travel urge", "Restlessness", "Adventure"],
    antonyms: ["Staycation", "Homebody"],
    imageUrl:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop",
    category: "travel",
    difficulty: "advanced",
    createdAt: new Date("2026-03-21"),
  },
  {
    _id: "22",
    word: "Tranquil",
    phonetic: "/ˈtræŋkwɪl/",
    description: "Calm and peaceful — free from noise or disturbance.",
    englishMeaning: "Free from disturbance; calm",
    bengaliMeaning: "শান্ত / প্রশান্ত",
    englishMeaningBengali: "কোনো কোলাহল বা বিশৃঙ্খলাহীন সম্পূর্ণ শান্ত ও প্রশান্তময় অবস্থা",
    bengaliDetails:
      "প্রকৃতির নীরবতা, সকালের শান্ত পরিবেশ বা মানসিক প্রশান্তির সুন্দর প্রকাশ ঘটাতে Tranquil ব্যবহার করা হয়।",
    exampleSentence:
      "The tranquil lake mirrored the sky at sunrise.",
    exampleSentenceBengali:
      "সূর্যোদয়ের সময় শান্ত হ্রদটির পানিতে আকাশের প্রতিফলন ভেসে উঠেছিল।",
    synonyms: ["Peaceful", "Serene", "Quiet"],
    antonyms: ["Noisy", "Chaotic"],
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
    category: "nature",
    difficulty: "intermediate",
    createdAt: new Date("2026-03-22"),
  },
  {
    _id: "23",
    word: "Empathy",
    phonetic: "/ˈempəθi/",
    description: "The ability to understand and share another person’s feelings.",
    englishMeaning: "The ability to understand and share the feelings of another",
    bengaliMeaning: "সহানুভূতি",
    englishMeaningBengali: "অন্যের অবস্থান ও অনুভূতিকে নিজের দিয়ে গভীরভাবে উপলব্ধি করার ক্ষমতা",
    bengaliDetails:
      "সহানুভূতি (Sympathy) এর চেয়ে এটি আরও গভীর। অন্যের জায়গায় নিজেকে বসিয়ে তার দুঃখ বা আনন্দ অনুভব করাই হলো Empathy।",
    exampleSentence:
      "Good teachers show empathy when a student struggles with new words.",
    exampleSentenceBengali:
      "শিক্ষার্থী যখন নতুন শব্দ নিয়ে সমস্যায় পড়ে তখন ভালো শিক্ষকরা গভীর অনুভূতি দিয়ে বিষয়টি বোঝেন।",
    synonyms: ["Compassion", "Understanding", "Sensitivity"],
    antonyms: ["Apathy", "Indifference"],
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    category: "emotions",
    difficulty: "intermediate",
    createdAt: new Date("2026-03-23"),
  },
  {
    _id: "24",
    word: "Vitality",
    phonetic: "/vaɪˈtælɪti/",
    description: "Lively energy and strength that keeps you feeling alive.",
    englishMeaning: "The state of being strong and active; energy",
    bengaliMeaning: "প্রাণশক্তি",
    englishMeaningBengali: "শারীরিক ও মানসিকভাবে চাঙ্গা এবং প্রাণবন্ত থাকার শক্তি",
    bengaliDetails:
      "উদ্যম, জীবনীশক্তি ও তারুণ্যের প্রতীক। সুস্থ জীবনযাপন মানুষের Vitality বাড়িয়ে তোলে।",
    exampleSentence:
      "Morning walks restored her vitality after weeks of late nights.",
    exampleSentenceBengali:
      "কয়েক সপ্তাহের রাত জাগার পর সকালের হাঁটা তার প্রাণশক্তি ফিরিয়ে এনেছিল।",
    synonyms: ["Energy", "Vigor", "Liveliness"],
    antonyms: ["Lethargy", "Weakness"],
    imageUrl:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
    category: "health",
    difficulty: "intermediate",
    createdAt: new Date("2026-03-24"),
  },
];
