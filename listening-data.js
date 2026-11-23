// ============================================================================
// BASIC IELTS LISTENING · UNIT THREE: SURVIVAL ENGLISH
// COMPLETE DATASET FOR EXERCISES 1 – 15 (TRACKS 53.MP3 – 67.MP3)
// ============================================================================

window.IELTS_LISTENING_DATA = (function () {
  const EXERCISES = [
    // ========================================================================
    // EXERCISE 1 — Health problems (53.MP3)
    // ========================================================================
    {
      id: "ex-01",
      num: "01",
      sectionGroup: "section1",
      title: "Health problems",
      titleVi: "Các vấn đề sức khỏe & lời khuyên",
      ieltsPart: "IELTS Part 1",
      questionType: "Note Completion (Điền ghi chú)",
      shortType: "Note Completion",
      trackFile: "53.mp3",
      trackLabel: "53.MP3",
      duration: "01:17",
      icon: "fa-briefcase-medical",
      themeBadge: "COLD & REMEDIES",
      themeColor: "#FEE2E2",
      instruction: "Listen to the conversation and fill in the missing information in the notes below.",
      wordLimit: "",
      wordBank: [
        { word: "stuffed up", ipa: "/stʌft ʌp/", vi: "bị nghẹt mũi" },
        { word: "sore throat", ipa: "/sɔː θrəʊt/", vi: "đau rát họng" },
        { word: "liquids", ipa: "/ˈlɪk.wɪdz/", vi: "chất lỏng, nước" },
        { word: "chicken soup", ipa: "/ˈtʃɪk.ɪn suːp/", vi: "súp gà" },
        { word: "garlic", ipa: "/ˈɡɑː.lɪk/", vi: "củ tỏi" },
        { word: "vitamin C", ipa: "/ˈvɪt.ə.mɪn siː/", vi: "vitamin C" }
      ],
      tips: [
        "Đọc nhanh các từ xung quanh ô trống để đoán từ loại: (1) danh từ bệnh, (2) tính từ/cụm chỉ tình trạng mũi, (3) & (4) danh từ thuốc/đồ uống, (5) nơi chốn, (6) món ăn, (7) đơn vị đo.",
        "Chú ý số nhiều ở câu (4): sau 'lots of' thường là danh từ số nhiều ('liquids').",
        "Trong hội thoại có từ đồng nghĩa/bẫy nhỏ: cuối bài Ellen nói 'chicken stock', nhưng Tom khuyên nấu 'chicken soup' — hãy điền đúng cụm xuất hiện ở câu khuyên."
      ],
      worksheet: {
        kind: "cloze",
        blocks: [
          {
            type: "paragraph",
            html:
              "Ellen has got a {{1}}. Her nose is {{2}} and she has a sore throat. Here is some advice. She should take some {{3}} and it's a good idea for her to drink lots of {{4}}. She'd better see a doctor first, and then go {{5}} for a rest. It's helpful to cook {{6}} with some garlic in it, and drink a {{7}} every half an hour. It really works."
          }
        ]
      },
      questions: [
        { id: "1", label: "Câu 1", answerDisplay: "(terrible) cold", accepted: ["cold", "terrible cold"], explanation: "Ellen nói: 'I think I've got a terrible cold.' Có thể điền 'cold' hoặc 'terrible cold'." },
        { id: "2", label: "Câu 2", answerDisplay: "stuffed up", accepted: ["stuffed up", "stuffed"], explanation: "Ellen mô tả triệu chứng: 'My nose is stuffed up and I've got a sore throat.'" },
        { id: "3", label: "Câu 3", answerDisplay: "vitamin C", accepted: ["vitamin c", "vit c"], explanation: "Tom khuyên: 'Well, you should take some vitamin C...'" },
        { id: "4", label: "Câu 4", answerDisplay: "liquids", accepted: ["liquids"], explanation: "Tom nói tiếp: '...and it's also a good idea to drink lots of liquids.' (Nhớ có 's')." },
        { id: "5", label: "Câu 5", answerDisplay: "(back) home", accepted: ["home", "back home"], explanation: "Tom nói: '...see a doctor first, and then go back home to rest.'" },
        { id: "6", label: "Câu 6", answerDisplay: "chicken soup", accepted: ["chicken soup"], explanation: "Tom khuyên: '...it's also helpful to cook chicken soup with some garlic in it...'" },
        { id: "7", label: "Câu 7", answerDisplay: "cup", accepted: ["cup"], explanation: "Tom nói tiếp: '...and drink a cup every half an hour.'" }
      ],
      tapescript: [
        { speaker: "Tom", en: "Hi, Ellen. What's the matter with you?", vi: "Chào Ellen. Bạn bị làm sao thế?" },
        { speaker: "Ellen", en: "I think I've got a terrible cold. My nose is stuffed up and I've got a sore throat.", vi: "Mình nghĩ mình bị cảm lạnh nặng rồi. Mũi mình bị nghẹt cứng và mình bị đau rát họng nữa.", evidence: ["terrible cold", "stuffed up"] },
        { speaker: "Tom", en: "Oh, that's too bad. You should be at home in bed. It's really important to get a good rest.", vi: "Ồ, tệ thật đấy. Bạn nên ở nhà nằm nghỉ trên giường. Nghỉ ngơi đầy đủ thực sự rất quan trọng." },
        { speaker: "Ellen", en: "Yeah, you're right.", vi: "Ừ, bạn nói đúng." },
        { speaker: "Tom", en: "And have you taken anything for it?", vi: "Bạn đã uống thuốc gì chưa?" },
        { speaker: "Ellen", en: "No, I haven't.", vi: "Chưa, mình chưa uống gì cả." },
        { speaker: "Tom", en: "Well, you should take some vitamin C and it's also a good idea to drink lots of liquids.", vi: "À, bạn nên uống thêm vitamin C và uống thật nhiều nước/chất lỏng nữa.", evidence: ["vitamin C", "liquids"] },
        { speaker: "Ellen", en: "That's a good suggestion. I've a bottle of vitamin C at home.", vi: "Gợi ý hay đấy. Mình có sẵn một lọ vitamin C ở nhà." },
        { speaker: "Tom", en: "Have you seen a doctor?", vi: "Bạn đã đi khám bác sĩ chưa?" },
        { speaker: "Ellen", en: "Not yet.", vi: "Vẫn chưa." },
        { speaker: "Tom", en: "Well, you'd better see a doctor first, and then go back home to rest.", vi: "Thế thì bạn nên đi khám bác sĩ trước, rồi sau đó về nhà nghỉ ngơi.", evidence: ["back home"] },
        { speaker: "Ellen", en: "Yeah, I'll do it right now.", vi: "Ừ, mình sẽ đi ngay bây giờ." },
        { speaker: "Tom", en: "Ellen, it's also helpful to cook chicken soup with some garlic in it, and drink a cup every half an hour. It really works.", vi: "Ellen này, nấu súp gà cho thêm ít tỏi rồi uống một cốc mỗi nửa tiếng cũng rất hiệu quả đấy. Thực sự có tác dụng lắm.", evidence: ["chicken soup", "cup"] },
        { speaker: "Ellen", en: "Oh, chicken stock for a cold? OK, I'll try it. Thanks.", vi: "Ồ, nước dùng gà chữa cảm lạnh á? Được rồi, mình sẽ thử. Cảm ơn nhé." },
        { speaker: "Tom", en: "I hope you recover soon.", vi: "Chúc bạn mau khỏe nhé." }
      ],
      scriptVocabTitle: "Từ vựng gạch chân trong Script",
      scriptVocab: [
        { word: "stuffed (up)", match: "stuffed up", pos: "adj", vi: "bị nghẹt, tắc (mũi)" },
        { word: "sore throat", match: "sore throat", pos: "n.p", vi: "đau rát họng, viêm họng" },
        { word: "chicken soup", match: "chicken soup", pos: "n.p", vi: "súp gà / canh gà" },
        { word: "garlic", match: "garlic", pos: "n", vi: "củ tỏi" }
      ]
    },

    // ========================================================================
    // EXERCISE 2 — In a camera shop (54.MP3)
    // ========================================================================
    {
      id: "ex-02",
      num: "02",
      sectionGroup: "section1",
      title: "In a camera shop",
      titleVi: "Mua máy ảnh tại cửa hàng",
      ieltsPart: "IELTS Part 1",
      questionType: "Note Completion (Điền ghi chú)",
      shortType: "Note Completion",
      trackFile: "54.mp3",
      trackLabel: "54.MP3",
      duration: "01:18",
      icon: "fa-camera-retro",
      themeBadge: "£45 AUTO YELLOW CAMERA",
      themeColor: "#FEF9C3",
      instruction: "Listen to the conversation and fill in the missing information in the notes below.",
      wordLimit: "",
      wordBank: [
        { word: "handle", ipa: "/ˈhæn.dəl/", vi: "sử dụng, cầm nắm" },
        { word: "automatic", ipa: "/ˌɔː.təˈmæt.ɪk/", vi: "tự động" },
        { word: "lens", ipa: "/lenz/", vi: "ống kính máy ảnh" },
        { word: "reasonable", ipa: "/ˈriː.zən.ə.bəl/", vi: "giá cả hợp lý" },
        { word: "cheap", ipa: "/tʃiːp/", vi: "rẻ" },
        { word: "colour", ipa: "/ˈkʌl.ər/", vi: "màu sắc" }
      ],
      tips: [
        "Chú ý bẫy giá tiền (Distractor) ở câu (5): cuối bài khách đưa tờ '50 pounds' để thanh toán, nhưng giá máy ảnh thực tế là '45 pounds / £45'.",
        "Chính tả Anh-Anh ('colour') và Anh-Mỹ ('color') đều được chấp nhận trong IELTS Listening.",
        "Để ý cụm 'easy to handle' (câu 2) và 'good lens' (câu 4) — tránh nhầm lẫn số nhiều 'lenses'."
      ],
      worksheet: {
        kind: "cloze",
        blocks: [
          {
            type: "paragraph",
            html:
              "The customer wants to buy a kind of camera which would be {{1}} and {{2}} to handle. The shop assistant recommended one which is {{3}} and has a good {{4}}. The price is only {{5}}. The customer liked the one the shop assistant recommended but she disliked the {{6}}. Finally, the customer bought a {{7}} camera."
          }
        ]
      },
      questions: [
        { id: "1", label: "Câu 1", answerDisplay: "cheap", accepted: ["cheap"], explanation: "Khách hàng nói: 'I want something cheap and easy to handle.'" },
        { id: "2", label: "Câu 2", answerDisplay: "easy", accepted: ["easy"], explanation: "Khách hàng nói: '...cheap and easy to handle.'" },
        { id: "3", label: "Câu 3", answerDisplay: "(all) automatic", accepted: ["automatic", "all automatic"], explanation: "Nhân viên giới thiệu: '...it's all automatic, so it's very easy to use.'" },
        { id: "4", label: "Câu 4", answerDisplay: "lens", accepted: ["lens"], explanation: "Nhân viên nói: 'It's got a very good lens...'" },
        { id: "5", label: "Câu 5", answerDisplay: "45 pounds / £45", accepted: ["45 pounds", "£45", "45£", "forty-five pounds", "forty five pounds", "45"], explanation: "Nhân viên báo giá: 'It's only 45 pounds.' (50 pounds ở cuối là tiền khách đưa để trả)." },
        { id: "6", label: "Câu 6", answerDisplay: "colour", accepted: ["colour", "color"], explanation: "Khách hàng nói: '...but I don't like the colour.'" },
        { id: "7", label: "Câu 7", answerDisplay: "yellow", accepted: ["yellow"], explanation: "Cuối bài khách chốt: 'All right. I will take this yellow one.'" }
      ],
      tapescript: [
        { speaker: "Shop assistant", en: "Good morning. Can I help you?", vi: "Chào buổi sáng. Tôi có thể giúp gì cho chị?" },
        { speaker: "Customer", en: "Yes, I want to buy a camera. What kind do you recommend?", vi: "Vâng, tôi muốn mua một chiếc máy ảnh. Anh gợi ý loại nào?" },
        { speaker: "Shop assistant", en: "Well, it all depends. We have many kinds of cameras here. How much money do you want to spend?", vi: "À, còn tùy ạ. Ở đây chúng tôi có rất nhiều loại máy ảnh. Chị định chi bao nhiêu tiền?" },
        { speaker: "Customer", en: "I want something cheap and easy to handle.", vi: "Tôi muốn loại nào rẻ và dễ sử dụng.", evidence: ["cheap", "easy"] },
        { speaker: "Shop assistant", en: "Are you an experienced photographer?", vi: "Chị đã có kinh nghiệm chụp ảnh chưa?" },
        { speaker: "Customer", en: "No, I've had no experience at all.", vi: "Không, tôi chưa có chút kinh nghiệm nào cả." },
        { speaker: "Shop assistant", en: "Here's a camera that would suit you very well. It's got a very good lens and it's all automatic, so it's very easy to use. Just press one button, and it's done.", vi: "Đây là chiếc máy ảnh rất hợp với chị. Nó có ống kính rất tốt và hoàn toàn tự động nên cực kỳ dễ dùng. Chỉ cần bấm một nút là xong.", evidence: ["lens", "all automatic"] },
        { speaker: "Customer", en: "How much does it cost?", vi: "Nó có giá bao nhiêu?" },
        { speaker: "Shop assistant", en: "It's only 45 pounds.", vi: "Chỉ 45 bảng Anh thôi ạ.", evidence: ["45 pounds"] },
        { speaker: "Customer", en: "Can I try?", vi: "Tôi dùng thử được không?" },
        { speaker: "Shop assistant", en: "Of course. Here you are.", vi: "Tất nhiên rồi. Của chị đây ạ." },
        { speaker: "Customer", en: "Well, I think the price is reasonable and I like that it is automatic, but I don't like the colour. Do you have any other colour?", vi: "Ừm, tôi thấy giá cả hợp lý và tôi thích tính năng tự động, nhưng tôi không thích màu này. Anh có màu khác không?", evidence: ["colour"] },
        { speaker: "Shop assistant", en: "Yes. How about this yellow one?", vi: "Có ạ. Chiếc màu vàng này thì sao?" },
        { speaker: "Customer", en: "It looks better. Is it the same price?", vi: "Trông đẹp hơn đấy. Giá vẫn như vậy chứ?" },
        { speaker: "Shop assistant", en: "Yes.", vi: "Vâng ạ." },
        { speaker: "Customer", en: "All right. I will take this yellow one. Here is 50 pounds.", vi: "Được rồi. Tôi lấy chiếc màu vàng này. Đây là 50 bảng.", evidence: ["yellow"] },
        { speaker: "Shop assistant", en: "Here is your change.", vi: "Đây là tiền thừa của chị ạ." }
      ],
      scriptVocabTitle: "Từ vựng bổ trợ trong bài",
      scriptVocab: [
        { word: "handle", match: "handle", pos: "v", vi: "sử dụng, điều khiển, cầm nắm" },
        { word: "lens", match: "lens", pos: "n", vi: "ống kính (máy ảnh)" },
        { word: "automatic", match: "automatic", pos: "adj", vi: "tự động" },
        { word: "reasonable", match: "reasonable", pos: "adj", vi: "hợp lý, phải chăng (giá cả)" }
      ]
    },

    // ========================================================================
    // EXERCISE 3 — In the restaurant (55.MP3)
    // ========================================================================
    {
      id: "ex-03",
      num: "03",
      sectionGroup: "section1",
      title: "In the restaurant",
      titleVi: "Gọi món ăn tại nhà hàng",
      ieltsPart: "IELTS Part 1",
      questionType: "Table / Matching (Tích chọn bảng)",
      shortType: "Table / Matching",
      trackFile: "55.mp3",
      trackLabel: "55.MP3",
      duration: "01:16",
      icon: "fa-utensils",
      themeBadge: "DINNER ORDERING",
      themeColor: "#FFEDD5",
      instruction: "Listen to the conversation and tick (✓) the items that the wife and husband ordered on the menu.",
      wordLimit: "",
      wordBank: [
        { word: "starters", ipa: "/ˈstɑː.təz/", vi: "món khai vị" },
        { word: "main course", ipa: "/meɪn kɔːs/", vi: "món chính" },
        { word: "roast beef", ipa: "/rəʊst biːf/", vi: "thịt bò nướng" },
        { word: "salmon", ipa: "/ˈsæm.ən/", vi: "cá hồi (âm l câm)" },
        { word: "peas", ipa: "/piːz/", vi: "đậu Hà Lan" },
        { word: "sweet / dessert", ipa: "/dɪˈzɜːt/", vi: "món tráng miệng" }
      ],
      tips: [
        "CẨN THẬN BẪY ĐỔI Ý (Self-correction): Người vợ ban đầu phân vân giữa 'salmon' và 'roast beef', nhưng sau đó nhớ ra lần trước đã ăn cá nên cuối cùng chọn 'roast beef'!",
        "Đừng quên đồ uống chung: Người chồng hỏi 'Shall I order some wine to go with the meal?' và người vợ đồng ý — vì vậy CẢ VỢ VÀ CHỒNG đều tích vào 'Wine'.",
        "Lưu ý phát âm 'salmon' /ˈsæm.ən/ không đọc âm /l/."
      ],
      worksheet: {
        kind: "menu-matrix",
        columns: [
          { key: "wife", label: "Wife" },
          { key: "husband", label: "Husband" }
        ],
        categories: [
          {
            name: "Starters",
            items: ["Apple juice", "Lemon juice", "Melon", "Chicken soup", "Onion soup"]
          },
          {
            name: "Main course",
            items: ["Roast beef", "Grilled steak", "Salmon", "Chicken"]
          },
          {
            name: "Vegetables",
            items: ["Carrots", "Peas", "Beans", "Chips", "Onion", "Boiled potatoes"]
          },
          {
            name: "Sweet / dessert",
            items: ["Chocolate cake", "Apple pie", "Fruit salad", "Ice cream"]
          },
          {
            name: "Drinks",
            items: ["Fruit juice", "Beer", "Wine", "Coffee"]
          }
        ],
        expectedTicks: {
          wife: ["Apple juice", "Roast beef", "Carrots", "Fruit salad", "Wine"],
          husband: ["Chicken soup", "Salmon", "Peas", "Chocolate cake", "Wine"]
        }
      },
      questions: [
        { id: "wife-Apple juice", label: "Wife · Starter", answerDisplay: "Apple juice", accepted: ["true"], explanation: "Vợ nói: 'I think I'll start with some apple juice...'" },
        { id: "wife-Roast beef", label: "Wife · Main course", answerDisplay: "Roast beef", accepted: ["true"], explanation: "Vợ phân vân salmon/roast beef rồi chọn: '...so I'll try the roast beef...'" },
        { id: "wife-Carrots", label: "Wife · Vegetable", answerDisplay: "Carrots", accepted: ["true"], explanation: "Vợ gọi thêm: '...and, yes, and some carrots.'" },
        { id: "wife-Fruit salad", label: "Wife · Dessert", answerDisplay: "Fruit salad", accepted: ["true"], explanation: "Vợ chọn tráng miệng: '...I think I'll have some fruit salad.'" },
        { id: "wife-Wine", label: "Wife · Drink", answerDisplay: "Wine", accepted: ["true"], explanation: "Chồng hỏi gọi rượu vang dùng kèm bữa ăn và vợ đồng ý: 'Yes, that would be nice.'" },
        { id: "husband-Chicken soup", label: "Husband · Starter", answerDisplay: "Chicken soup", accepted: ["true"], explanation: "Chồng nói: 'I'll start with chicken soup.'" },
        { id: "husband-Salmon", label: "Husband · Main course", answerDisplay: "Salmon", accepted: ["true"], explanation: "Chồng nói: 'And I love fish, so I think I'll have salmon...'" },
        { id: "husband-Peas", label: "Husband · Vegetable", answerDisplay: "Peas", accepted: ["true"], explanation: "Chồng gọi kèm: '...salmon and some peas.'" },
        { id: "husband-Chocolate cake", label: "Husband · Dessert", answerDisplay: "Chocolate cake", accepted: ["true"], explanation: "Chồng chọn tráng miệng: 'I think I'll have chocolate cake.'" },
        { id: "husband-Wine", label: "Husband · Drink", answerDisplay: "Wine", accepted: ["true"], explanation: "Chồng đề nghị: 'Shall I order some wine to go with the meal?'" }
      ],
      tapescript: [
        { speaker: "Waiter", en: "Good evening. Would you like to order now?", vi: "Chào buổi tối. Quý khách đã muốn gọi món chưa ạ?" },
        { speaker: "Husband", en: "Just a moment. Can we see what you have got on your menu first? There is quite a good choice on the menu, isn't there, dear?", vi: "Đợi một chút nhé. Chúng tôi xem thực đơn có món gì trước được không? Thực đơn có khá nhiều lựa chọn hay đấy, đúng không em yêu?" },
        { speaker: "Wife", en: "Yes.", vi: "Đúng vậy." },
        { speaker: "Husband", en: "Do you want to order first?", vi: "Em có muốn gọi món trước không?" },
        { speaker: "Wife", en: "All right. I think I'll start with some apple juice, but I can't decide whether to have salmon or roast beef... oh, I remember I had fish last time we were here, so I'll try the roast beef... and, yes, and some carrots.", vi: "Được thôi. Em nghĩ em sẽ khai vị bằng nước ép táo, nhưng em chưa quyết được nên ăn cá hồi hay thịt bò nướng... ồ, em nhớ lần trước tới đây em ăn cá rồi, nên em sẽ thử thịt bò nướng... à vâng, thêm ít cà rốt nữa.", evidence: ["apple juice", "roast beef", "carrots"] },
        { speaker: "Husband", en: "What about the sweet?", vi: "Còn món tráng miệng thì sao?" },
        { speaker: "Wife", en: "Well, we can order that later, but I think I'll have some fruit salad.", vi: "Ừm, mình có thể gọi sau cũng được, nhưng em nghĩ em sẽ ăn salad hoa quả.", evidence: ["fruit salad"] },
        { speaker: "Husband", en: "Shall I order some wine to go with the meal?", vi: "Anh gọi ít rượu vang uống kèm bữa ăn nhé?", evidence: ["wine"] },
        { speaker: "Wife", en: "Yes, that would be nice. So what are you going to have?", vi: "Vâng, thế thì tuyệt quá. Vậy anh định ăn gì?" },
        { speaker: "Husband", en: "I'll start with chicken soup. And I love fish, so I think I'll have salmon and some peas.", vi: "Anh sẽ bắt đầu với súp gà. Mà anh thích cá, nên anh sẽ ăn cá hồi và ít đậu Hà Lan.", evidence: ["chicken soup", "salmon", "peas"] },
        { speaker: "Wife", en: "What are you going to choose for dessert?", vi: "Anh chọn món tráng miệng nào?" },
        { speaker: "Husband", en: "I think I'll have chocolate cake.", vi: "Anh nghĩ anh sẽ ăn bánh sô-cô-la.", evidence: ["chocolate cake"] }
      ],
      scriptVocabTitle: "Từ vựng gạch chân & bổ trợ",
      scriptVocab: [
        { word: "salmon", match: "salmon", pos: "n", vi: "cá hồi" },
        { word: "roast beef", match: "roast beef", pos: "n.p", vi: "thịt bò nướng / quay" }
      ]
    },

    // ========================================================================
    // EXERCISE 4 — At the reception desk in a hotel (56.MP3)
    // ========================================================================
    {
      id: "ex-04",
      num: "04",
      sectionGroup: "section1",
      title: "At the reception desk in a hotel",
      titleVi: "Làm thủ tục nhận phòng tại lễ tân khách sạn",
      ieltsPart: "IELTS Part 1",
      questionType: "Form Completion (Điền biểu mẫu)",
      shortType: "Form Completion",
      trackFile: "56.mp3",
      trackLabel: "56.MP3",
      duration: "01:22",
      icon: "fa-concierge-bell",
      themeBadge: "HOTEL CHECK-IN · 405",
      themeColor: "#DBEAFE",
      instruction: "Listen to the conversation and fill in the missing information.",
      wordLimit: "",
      wordBank: [
        { word: "reserved", ipa: "/rɪˈzɜːvd/", vi: "đã đặt trước" },
        { word: "single room", ipa: "/ˈsɪŋ.ɡəl ruːm/", vi: "phòng đơn" },
        { word: "fourth floor", ipa: "/fɔːθ flɔːr/", vi: "tầng 4" },
        { word: "intend to stay", ipa: "/ɪnˈtend/", vi: "dự định lưu trú" },
        { word: "wake ... up", ipa: "/weɪk ʌp/", vi: "đánh thức dậy" },
        { word: "porter", ipa: "/ˈpɔː.tər/", vi: "nhân viên hành lý" }
      ],
      tips: [
        "Nghe kỹ tên riêng 'Arthur Collins' (viết hoa chữ cái đầu, chú ý hai chữ 'l' trong Collins).",
        "Số phòng '405' đọc là 'four oh five' — không nhầm với 45.",
        "Giờ báo thức được nhắc lại theo 2 cách: khách nói '7:10 in the morning', lễ tân xác nhận 'Ten past seven'."
      ],
      worksheet: {
        kind: "form-grid",
        fields: [
          { id: "1", label: "Customer's name", placeholder: "VD: Arthur Collins" },
          { id: "2", label: "When to book", placeholder: "VD: 3 days ago" },
          { id: "3", label: "Type of room", placeholder: "VD: single room" },
          { id: "4", label: "Room number", placeholder: "VD: 405" },
          { id: "5", label: "Floor", placeholder: "VD: 4th floor" },
          { id: "6", label: "Day to come", placeholder: "VD: Monday" },
          { id: "7", label: "Day to leave", placeholder: "VD: Friday morning" },
          { id: "8", label: "Requirement", placeholder: "VD: Wake him up at 7:10 in the morning" }
        ]
      },
      questions: [
        { id: "1", label: "Customer's name", answerDisplay: "Arthur Collins", accepted: ["arthur collins", "mr arthur collins", "mr. arthur collins"], explanation: "Khách tự giới thiệu: 'My name is Arthur Collins.'" },
        { id: "2", label: "When to book", answerDisplay: "3 days ago", accepted: ["3 days ago", "three days ago"], explanation: "Lễ tân xác nhận: 'You booked a single room three days ago.'" },
        { id: "3", label: "Type of room", answerDisplay: "single room", accepted: ["single room", "single", "a single room"], explanation: "Lễ tân đọc: 'You booked a single room...'" },
        { id: "4", label: "Room number", answerDisplay: "405", accepted: ["405", "room 405"], explanation: "Lễ tân thông báo: '...your room number is 405...'" },
        { id: "5", label: "Floor", answerDisplay: "4th floor (fourth floor)", accepted: ["4th", "4th floor", "fourth", "fourth floor", "4", "4th fl", "4th fl."], explanation: "Lễ tân nói: '...on the fourth floor.'" },
        { id: "6", label: "Day to come", answerDisplay: "Monday", accepted: ["monday", "mon"], explanation: "Ông Collins nói: 'today is Monday...'" },
        { id: "7", label: "Day to leave", answerDisplay: "Friday morning", accepted: ["friday morning", "friday", "fri morning", "fri", "on friday morning"], explanation: "Ông Collins nói: '...probably I'm going to leave on Friday morning.'" },
        {
          id: "8",
          label: "Requirement",
          answerDisplay: "Wake him up at 7:10 in the morning",
          accepted: ["wake him up at 7:10 in the morning", "wake up at 7:10", "wake me up at 7:10", "wake up call at 7:10", "7:10"],
          matcher: "regex",
          pattern: "(7[:.]10|ten\\s+past\\s+seven)",
          explanation: "Ông Collins yêu cầu: 'would you please wake me up at 7:10 in the morning, please?'"
        }
      ],
      tapescript: [
        { speaker: "Receptionist", en: "Good evening, sir.", vi: "Chào buổi tối, thưa ông." },
        { speaker: "Mr. Collins", en: "Good evening. My name is Arthur Collins. I believe you have a room reserved for me.", vi: "Chào buổi tối. Tên tôi là Arthur Collins. Tôi nghĩ bên khách sạn có phòng đặt trước cho tôi.", evidence: ["Arthur Collins"] },
        { speaker: "Receptionist", en: "Just a moment, Mr. Collins. Let me see... Collins... yes, Mr. Collins. You booked a single room three days ago. Is that right?", vi: "Đợi một chút ạ, ông Collins. Để tôi xem... Collins... vâng, ông Collins. Ông đã đặt một phòng đơn cách đây ba ngày. Có đúng vậy không ạ?", evidence: ["single room", "three days ago"] },
        { speaker: "Mr. Collins", en: "Yes, that's right.", vi: "Vâng, đúng vậy." },
        { speaker: "Receptionist", en: "Mr. Collins, your room number is 405 on the fourth floor. Would you fill in this form, please?", vi: "Thưa ông Collins, số phòng của ông là 405 ở tầng bốn. Phiền ông điền vào biểu mẫu này nhé?", evidence: ["405", "fourth floor"] },
        { speaker: "Mr. Collins", en: "Certainly.", vi: "Chắc chắn rồi." },
        { speaker: "Receptionist", en: "How long do you intend to stay in the hotel, Mr. Collins?", vi: "Ông dự định ở lại khách sạn bao lâu ạ, thưa ông Collins?" },
        { speaker: "Mr. Collins", en: "Let me see... today is Monday and... probably I'm going to leave on Friday morning.", vi: "Để xem nào... hôm nay là thứ Hai và... có lẽ tôi sẽ rời đi vào sáng thứ Sáu.", evidence: ["Monday", "Friday morning"] },
        { speaker: "Receptionist", en: "On Friday morning, I see.", vi: "Sáng thứ Sáu, tôi đã rõ." },
        { speaker: "Mr. Collins", en: "Oh, excuse me. Where shall I put my passport number?", vi: "Ồ, xin lỗi. Tôi điền số hộ chiếu ở đâu?" },
        { speaker: "Receptionist", en: "Just at the bottom. That's right. Thank you.", vi: "Ngay ở phía dưới cùng ạ. Đúng rồi đó ạ. Cảm ơn ông." },
        { speaker: "Mr. Collins", en: "Oh, would you please wake me up at 7:10 in the morning, please?", vi: "Ồ, phiền cô gọi đánh thức tôi lúc 7 giờ 10 sáng mai được không?", evidence: ["wake me up at 7:10 in the morning"] },
        { speaker: "Receptionist", en: "Ten past seven, certainly. Porter, please take Mr. Collins's suitcase to his room. Mr. Collins, please follow him.", vi: "7 giờ 10 phút, chắc chắn rồi ạ. Nhân viên hành lý ơi, vui lòng mang vali của ông Collins lên phòng. Thưa ông Collins, xin mời ông đi theo cậu ấy." },
        { speaker: "Mr. Collins", en: "Thank you.", vi: "Cảm ơn cô." },
        { speaker: "Receptionist", en: "You are welcome.", vi: "Không có gì ạ." }
      ],
      scriptVocabTitle: "Từ vựng bổ trợ trong bài",
      scriptVocab: [
        { word: "reserved", match: "reserved", pos: "adj/v", vi: "đã được đặt trước (phòng, bàn)" },
        { word: "porter", match: "Porter", pos: "n", vi: "nhân viên khuân vác hành lý (khách sạn)" }
      ]
    },

    // ========================================================================
    // EXERCISE 5 — Christmas (57.MP3)
    // ========================================================================
    {
      id: "ex-05",
      num: "05",
      sectionGroup: "section1",
      title: "Christmas",
      titleVi: "Truyền thống Giáng sinh tại Anh",
      ieltsPart: "IELTS Part 2",
      questionType: "Sentence Completion (Hoàn thành câu)",
      shortType: "Sentence Completion",
      trackFile: "57.mp3",
      trackLabel: "57.MP3",
      duration: "01:57",
      icon: "fa-gifts",
      themeBadge: "BRITISH CHRISTMAS",
      themeColor: "#DCFCE7",
      instruction: "Listen to the talk and complete the notes. Write NO MORE THAN THREE WORDS for each answer.",
      wordLimit: "NO MORE THAN THREE WORDS",
      wordBank: [
        { word: "decorate", ipa: "/ˈdek.ə.reɪt/", vi: "trang trí" },
        { word: "giving of presents", ipa: "/ˈprez.ənts/", vi: "việc tặng quà" },
        { word: "at the bottom", ipa: "/ˈbɒt.əm/", vi: "ở dưới gốc/đáy" },
        { word: "chimney", ipa: "/ˈtʃɪm.ni/", vi: "ống khói" },
        { word: "turkey dinner", ipa: "/ˈtɜː.ki/", vi: "bữa tối gà tây" },
        { word: "delivers", ipa: "/dɪˈlɪv.əz/", vi: "phát biểu, truyền tải" },
        { word: "Commonwealth", ipa: "/ˈkɒm.ən.welθ/", vi: "Khối Thịnh vượng chung" },
        { word: "watch football", ipa: "/wɒtʃ ˈfʊt.bɔːl/", vi: "xem bóng đá" }
      ],
      tips: [
        "GIỚI HẠN TỪ: 'Write NO MORE THAN THREE WORDS' — tuyệt đối không viết quá 3 từ cho mỗi ô trống!",
        "Câu 5 và câu 7 mỗi câu có 2 ô trống nhỏ (5a & 5b, 7a & 7b) — hãy đọc trước cả câu để bắt đúng nhịp bài nói.",
        "Chú ý 'Commonwealth' viết hoa và chính tả 'chimney', 'delivers' (chia ngôi thứ ba số ít vì chủ ngữ là 'The Queen')."
      ],
      worksheet: {
        kind: "sentences",
        items: [
          { num: "1", html: "In Britain, people start to decorate their houses a {{1}} before 25th December." },
          { num: "2", html: "In Christmas time, the most important activity is the {{2}}." },
          { num: "3", html: "The British people put their gifts {{3}} of the Christmas tree." },
          { num: "4", html: "The British open their Christmas presents on {{4}}." },
          { num: "5", html: "Children leave a long sock or stocking at the {{5a}} their bed on Christmas Eve, hoping that Father Christmas will bring small presents from {{5b}}." },
          { num: "6", html: "The British family have a {{6}} and Christmas pudding for the dinner on Christmas Day." },
          { num: "7", html: "The Queen {{7a}} her traditional Christmas message to the United Kingdom and {{7b}} later in the afternoon." },
          { num: "8", html: "On Boxing Day, people usually visit friends and relatives or {{8}}." }
        ]
      },
      questions: [
        { id: "1", label: "Câu 1", answerDisplay: "week or two", accepted: ["week or two"], explanation: "Bài nói: '...decorate their houses a week or two before 25th December...'" },
        { id: "2", label: "Câu 2", answerDisplay: "giving of presents", accepted: ["giving of presents"], explanation: "Bài nói: 'The most important one is the giving of presents.'" },
        { id: "3", label: "Câu 3", answerDisplay: "at the bottom", accepted: ["at the bottom"], explanation: "Bài nói: '...leave them at the bottom of the Christmas tree...'" },
        { id: "4", label: "Câu 4", answerDisplay: "Christmas morning", accepted: ["christmas morning"], explanation: "Bài nói: '...to be found on Christmas morning.'" },
        { id: "5a", label: "Câu 5 (trống 1)", answerDisplay: "end of", accepted: ["end of"], explanation: "Bài nói: '...at the end of their bed on Christmas Eve...'" },
        { id: "5b", label: "Câu 5 (trống 2)", answerDisplay: "the chimney", accepted: ["the chimney", "chimney"], explanation: "Bài nói: '...Father Christmas will come down the chimney...'" },
        { id: "6", label: "Câu 6", answerDisplay: "big turkey dinner", accepted: ["big turkey dinner", "turkey dinner"], explanation: "Bài nói: '...sit down for a big turkey dinner and Christmas pudding.'" },
        { id: "7a", label: "Câu 7 (trống 1)", answerDisplay: "delivers", accepted: ["delivers"], explanation: "Bài nói: '...as she delivers her traditional Christmas message...'" },
        { id: "7b", label: "Câu 7 (trống 2)", answerDisplay: "Commonwealth", accepted: ["commonwealth", "the commonwealth"], explanation: "Bài nói: '...to the United Kingdom and the Commonwealth.'" },
        { id: "8", label: "Câu 8", answerDisplay: "watch football", accepted: ["watch football"], explanation: "Bài nói: '...to visit friends and relatives or watch football.'" }
      ],
      tapescript: [
        {
          speaker: "Speaker",
          en: "The Christmas season begins very early in Britain. By the end of October, you may see Christmas decorations in the streets and Christmas cards and gifts in the shops. Traditionally, people start to decorate their houses a week or two before 25th December, which is Christmas Day.",
          vi: "Mùa Giáng sinh bắt đầu rất sớm ở Anh. Vào cuối tháng Mười, bạn có thể thấy đồ trang trí Giáng sinh trên phố cùng thiệp và quà trong các cửa hàng. Theo truyền thống, mọi người bắt đầu trang trí nhà cửa khoảng một hoặc hai tuần trước ngày 25 tháng 12, tức ngày lễ Giáng sinh.",
          evidence: ["week or two"]
        },
        {
          speaker: "Speaker",
          en: "There are a lot of traditions connected with Christmas. The most important one is the giving of presents. Family members wrap up their gifts and leave them at the bottom of the Christmas tree to be found on Christmas morning. Children leave a long sock or stocking at the end of their bed on Christmas Eve, 24th December, hoping that Father Christmas will come down the chimney during the night and bring them small presents, fruit and nuts. They are not usually disappointed.",
          vi: "Có rất nhiều truyền thống gắn liền với Giáng sinh. Quan trọng nhất là việc tặng quà. Các thành viên trong gia đình gói quà và đặt dưới gốc cây thông Noel để mở vào sáng Giáng sinh. Trẻ em treo một chiếc tất dài ở cuối giường vào đêm Giáng sinh 24/12, hy vọng Ông già Noel sẽ chui xuống từ ống khói trong đêm và mang đến những món quà nhỏ, trái cây và các loại hạt. Các em thường không phải thất vọng.",
          evidence: ["giving of presents", "at the bottom", "Christmas morning", "end of", "the chimney"]
        },
        {
          speaker: "Speaker",
          en: "Sometimes on Christmas Day, the family will sit down for a big turkey dinner and Christmas pudding. Later in the afternoon, they may watch the Queen on television as she delivers her traditional Christmas message to the United Kingdom and the Commonwealth. If they have room for even more food, they may enjoy a piece of Christmas cake or eat a hot mince pie. 26th December is also a public holiday, Boxing Day, and this is the time to visit friends and relatives or watch football.",
          vi: "Vào ngày Giáng sinh, cả gia đình sẽ quây quần thưởng thức bữa tối gà tây thịnh soạn và bánh pudding Giáng sinh. Cuối buổi chiều, họ có thể xem Nữ hoàng trên truyền hình khi bà phát biểu thông điệp Giáng sinh truyền thống tới Vương quốc Anh và Khối Thịnh vượng chung. Nếu vẫn còn bụng ăn thêm, họ có thể thưởng thức một miếng bánh Giáng sinh hoặc bánh nướng nhân mứt hoa quả nóng. Ngày 26/12 cũng là ngày nghỉ lễ, gọi là Ngày Tặng quà (Boxing Day), và đây là dịp để thăm bạn bè, họ hàng hoặc xem bóng đá.",
          evidence: ["big turkey dinner", "delivers", "Commonwealth", "watch football"]
        }
      ],
      scriptVocabTitle: "Từ vựng gạch chân trong Script",
      scriptVocab: [
        { word: "decorations", match: "decorations", pos: "n", vi: "đồ trang trí" },
        { word: "wrap (up)", match: "wrap up", pos: "v", vi: "gói, bọc (quà)" },
        { word: "chimney", match: "chimney", pos: "n", vi: "ống khói" },
        { word: "Commonwealth", match: "Commonwealth", pos: "n", vi: "Khối Thịnh vượng chung (Anh)" },
        { word: "mince pie", match: "mince pie", pos: "n.p", vi: "bánh nướng nhân mứt hoa quả khô" }
      ]
    },

    // ========================================================================
    // EXERCISE 6 — Trip to Stonehenge (58.MP3)
    // ========================================================================
    {
      id: "ex-06",
      num: "06",
      sectionGroup: "section1",
      title: "Trip to Stonehenge",
      titleVi: "Chuyến tham quan bãi đá cổ Stonehenge",
      ieltsPart: "IELTS Part 1/3",
      questionType: "Summary Completion (Điền tóm tắt)",
      shortType: "Summary Completion",
      trackFile: "58.mp3",
      trackLabel: "58.MP3",
      duration: "01:39",
      icon: "fa-monument",
      themeBadge: "STONEHENGE (4,000 YRS)",
      themeColor: "#E0E7FF",
      instruction: "Listen to the conversation and fill in the missing information in the notes below.",
      wordLimit: "",
      wordBank: [
        { word: "host family", ipa: "/həʊst/", vi: "gia đình bản xứ" },
        { word: "prehistoric", ipa: "/ˌpriː.hɪˈstɒr.ɪk/", vi: "thuộc thời tiền sử" },
        { word: "remains", ipa: "/rɪˈmeɪnz/", vi: "di tích, tàn tích" },
        { word: "theories", ipa: "/ˈθɪə.riz/", vi: "các giả thuyết" },
        { word: "original", ipa: "/əˈrɪdʒ.ən.əl/", vi: "ban đầu, nguyên bản" },
        { word: "stars and planets", ipa: "/ˈplæn.ɪts/", vi: "sao và hành tinh" },
        { word: "calendar", ipa: "/ˈkæl.ən.dər/", vi: "bộ lịch" }
      ],
      tips: [
        "Nghe kỹ số nhiều ở câu (2) 'remains' và câu (5) 'stars and planets' — thiếu 's' sẽ bị tính sai trong IELTS.",
        "Câu (3) là số năm: viết '4,000' hoặc '4000' đều chính xác và tiết kiệm thời gian hơn viết chữ.",
        "Chú ý chính tả dễ sai của từ 'calendar' (kết thúc bằng -ar, không phải -er)."
      ],
      worksheet: {
        kind: "cloze",
        blocks: [
          {
            type: "paragraph",
            html:
              "Sue went to Stonehenge at the weekend with her {{1}} family. Stonehenge is the best known and the most remarkable of prehistoric {{2}} in the UK. It has stood on Salisbury Plain for about {{3}} years. There have been many different theories about its {{4}} use. One theory is that it was a place from where {{5}} could be observed. But no one is certain why it was built. It has been discovered that the positions of {{6}} of the stones relate to the movements of the {{7}}, so that the stones could be used as a {{8}}."
          }
        ]
      },
      questions: [
        { id: "1", label: "Câu 1", answerDisplay: "host", accepted: ["host"], explanation: "Sue nói: 'I went to Stonehenge with my host family.'" },
        { id: "2", label: "Câu 2", answerDisplay: "remains", accepted: ["remains"], explanation: "Sue nói: '...the most remarkable of prehistoric remains in the UK.'" },
        { id: "3", label: "Câu 3", answerDisplay: "4,000", accepted: ["4,000", "4000", "four thousand"], explanation: "David nói: 'It has stood on Salisbury Plain for about 4,000 years.'" },
        { id: "4", label: "Câu 4", answerDisplay: "original", accepted: ["original"], explanation: "David nói: '...many different theories about its original use.'" },
        { id: "5", label: "Câu 5", answerDisplay: "stars and planets", accepted: ["stars and planets"], explanation: "Sue nói: '...a place from where stars and planets could be observed.'" },
        { id: "6", label: "Câu 6", answerDisplay: "some", accepted: ["some"], explanation: "David nói: '...the positions of some of the stones...'" },
        { id: "7", label: "Câu 7", answerDisplay: "sun and moon", accepted: ["sun and moon", "sun and the moon"], explanation: "David nói: '...relate to the movements of the sun and moon...'" },
        { id: "8", label: "Câu 8", answerDisplay: "calendar", accepted: ["calendar"], explanation: "David kết luận: '...so that the stones could be used as a calendar.'" }
      ],
      tapescript: [
        { speaker: "David", en: "Hi, Sue. How was your weekend?", vi: "Chào Sue. Cuối tuần của bạn thế nào?" },
        { speaker: "Sue", en: "Oh, really good. I went to Stonehenge with my host family.", vi: "Ồ, tuyệt lắm. Mình đã đi thăm bãi đá cổ Stonehenge cùng gia đình bản xứ.", evidence: ["host"] },
        { speaker: "David", en: "Stonehenge?", vi: "Stonehenge á?" },
        { speaker: "Sue", en: "Yes, that's right. Have you ever been there?", vi: "Ừ, đúng vậy. Bạn đã bao giờ đến đó chưa?" },
        { speaker: "David", en: "Yes. I went there last month. I really enjoyed it.", vi: "Rồi. Mình đi tháng trước. Mình rất thích nơi đó." },
        { speaker: "Sue", en: "Me too. Stonehenge is the best known and probably the most remarkable of prehistoric remains in the UK.", vi: "Mình cũng thế. Stonehenge là di tích thời tiền sử nổi tiếng nhất và có lẽ là đáng chú ý nhất ở Vương quốc Anh.", evidence: ["remains"] },
        { speaker: "David", en: "Yes. It has stood on Salisbury Plain for about 4,000 years. You know, there have been many different theories about its original use.", vi: "Đúng vậy. Nó đã đứng trên đồng bằng Salisbury khoảng 4.000 năm rồi. Bạn biết đấy, có rất nhiều giả thuyết khác nhau về công dụng ban đầu của nó.", evidence: ["4,000", "original"] },
        { speaker: "Sue", en: "Yes, I know. My host father told me that one of the theories is that it was a place from where stars and planets could be observed.", vi: "Ừ, mình biết. Bố bản xứ của mình kể rằng một trong các giả thuyết cho rằng đó là nơi để quan sát các vì sao và hành tinh.", evidence: ["stars and planets"] },
        { speaker: "David", en: "Yes, but no one is really certain why it was built. One of the things people have discovered is the positions of some of the stones relate to the movements of the sun and moon, so that the stones could be used as a calendar.", vi: "Đúng, nhưng không ai thực sự chắc chắn tại sao nó được xây dựng. Một điều người ta khám phá ra là vị trí của một số tảng đá liên quan tới chuyển động của mặt trời và mặt trăng, nên những tảng đá này có thể dùng như một bộ lịch.", evidence: ["some", "sun and moon", "calendar"] },
        { speaker: "Sue", en: "That's interesting.", vi: "Thú vị thật đấy." },
        { speaker: "David", en: "Did you go to Oxford too? It's not far from Stonehenge.", vi: "Bạn có ghé qua Oxford không? Cũng không xa Stonehenge đâu." },
        { speaker: "Sue", en: "No, we didn't, because of the time. My host family had to be back before 3 in the afternoon.", vi: "Không, tụi mình không đi vì không đủ thời gian. Gia đình bản xứ phải về trước 3 giờ chiều." },
        { speaker: "David", en: "What a pity. You should go sometime. It's very interesting too.", vi: "Tiếc quá. Lúc nào đó bạn nên đi nhé. Ở đó cũng rất thú vị." },
        { speaker: "Sue", en: "Yes. I hope I can sometime.", vi: "Ừ. Mình hy vọng lúc nào đó sẽ đi được." }
      ],
      scriptVocabTitle: "Từ vựng gạch chân trong Script",
      scriptVocab: [
        { word: "Stonehenge", match: "Stonehenge", pos: "n", vi: "bãi đá cổ Stonehenge (tại Anh)" },
        { word: "prehistoric", match: "prehistoric", pos: "adj", vi: "thuộc thời tiền sử" },
        { word: "Plain", match: "Plain", pos: "n", vi: "đồng bằng (Salisbury Plain)" },
        { word: "theories", match: "theories", pos: "n", vi: "các giả thuyết, học thuyết" },
        { word: "calendar", match: "calendar", pos: "n", vi: "bộ lịch" }
      ]
    },

    // ========================================================================
    // EXERCISE 7 — Marriage (59.MP3)
    // ========================================================================
    {
      id: "ex-07",
      num: "07",
      sectionGroup: "section1",
      title: "Marriage",
      titleVi: "Hôn nhân & số liệu gia đình Mỹ – Hàn",
      ieltsPart: "IELTS Part 3",
      questionType: "Summary Completion (Tóm tắt & số liệu)",
      shortType: "Summary Completion",
      trackFile: "59.mp3",
      trackLabel: "59.MP3",
      duration: "01:49",
      icon: "fa-ring",
      themeBadge: "FAMILY & MARRIAGE STATS",
      themeColor: "#FCE7F3",
      instruction: "Listen to the conversation and fill in the missing information in the notes below.",
      wordLimit: "",
      wordBank: [
        { word: "divorce", ipa: "/dɪˈvɔːs/", vi: "ly hôn" },
        { word: "younger", ipa: "/ˈjʌŋ.ɡər/", vi: "kết hôn trẻ hơn" },
        { word: "get married", ipa: "/ˈmær.id/", vi: "lập gia đình" },
        { word: "go back to work", ipa: "/wɜːk/", vi: "quay lại đi làm" },
        { word: "stay at home", ipa: "/steɪ/", vi: "ở nhà nội trợ" },
        { word: "single parent", ipa: "/ˈsɪŋ.ɡəl/", vi: "cha/mẹ đơn thân" }
      ],
      tips: [
        "Cẩn thận câu (1): Trong bài nghe xuất hiện 'Korea' (tên nước) và 'Korean' (tính từ). Trước từ 'ones' cần điền tính từ 'Korean' (viết hoa chữ K).",
        "Bài có nhiều số phần trăm (50%, 67%, 57%) — nghe thật kỹ hàng chục để không nhầm 57% với 67% ở câu (7) và (8).",
        "Câu (5) đã có sẵn 'go back' phía trước, nên chỉ cần điền 'to work'."
      ],
      worksheet: {
        kind: "cloze",
        blocks: [
          {
            type: "paragraph",
            html:
              "American families are different from {{1}} ones in several ways. People in the USA get married {{2}}. Many of them get married before the age of {{3}}. A lot of women work after they {{4}}. Most women who have babies go back {{5}} fairly soon. 50% of them return to work within a year of having a baby. A lot of Korean women {{6}} and take care of their families. The article says {{7}} of women with children work. And {{8}} of children under six have two parents who work or a single parent who works."
          }
        ]
      },
      questions: [
        { id: "1", label: "Câu 1", answerDisplay: "Korean", accepted: ["korean"], explanation: "Hai nhân vật so sánh gia đình ở Mỹ và Hàn Quốc ('Most Korean couples...')." },
        { id: "2", label: "Câu 2", answerDisplay: "younger", accepted: ["younger"], explanation: "Steve nói: 'Well, I think people get married younger.'" },
        { id: "3", label: "Câu 3", answerDisplay: "20", accepted: ["20", "twenty"], explanation: "Steve nói: '...get married before the age of 20.'" },
        { id: "4", label: "Câu 4", answerDisplay: "get married", accepted: ["get married"], explanation: "Steve nói: 'A lot of women work after they get married.'" },
        { id: "5", label: "Câu 5", answerDisplay: "to work", accepted: ["to work"], explanation: "Steve nói: '...most women who have babies go back to work fairly soon too.'" },
        { id: "6", label: "Câu 6", answerDisplay: "stay at home", accepted: ["stay at home"], explanation: "Soo Mi nói: 'A lot of women stay at home and take care of their families...'" },
        { id: "7", label: "Câu 7", answerDisplay: "67%", accepted: ["67%", "67 percent", "67 per cent", "67"], explanation: "Steve đọc số liệu: 'It says 67% of women with children work.'" },
        { id: "8", label: "Câu 8", answerDisplay: "57%", accepted: ["57%", "57 percent", "57 per cent", "57"], explanation: "Steve đọc tiếp: 'And 57% of children under six have two parents who work...'" }
      ],
      tapescript: [
        { speaker: "Soo Mi", en: "Hello, Steve. Have you read this article?", vi: "Chào Steve. Bạn đã đọc bài báo này chưa?" },
        { speaker: "Steve", en: "Not yet. What is in it?", vi: "Chưa. Trong đó viết gì thế?" },
        { speaker: "Soo Mi", en: "There are some facts about families in the United States. It says that 50% of marriages end in divorce in the United States.", vi: "Có một số sự thật về các gia đình ở Mỹ. Bài báo nói rằng 50% các cuộc hôn nhân ở Mỹ kết thúc bằng ly hôn." },
        { speaker: "Steve", en: "That's quite high, isn't it? Do many people get divorced in Korea?", vi: "Khá cao đấy chứ nhỉ? Ở Hàn Quốc có nhiều người ly hôn không?" },
        { speaker: "Soo Mi", en: "No. Most Korean couples stay together.", vi: "Không. Hầu hết các cặp vợ chồng Hàn Quốc vẫn gắn bó với nhau.", evidence: ["Korean"] },
        { speaker: "Steve", en: "Families are sure different in America.", vi: "Gia đình ở Mỹ chắc chắn khác biệt thật." },
        { speaker: "Soo Mi", en: "Well, there are more divorces but what else is different?", vi: "Ừ, có nhiều vụ ly hôn hơn nhưng còn điểm gì khác nữa?" },
        { speaker: "Steve", en: "Well, I think people get married younger.", vi: "À, mình nghĩ mọi người kết hôn sớm hơn (trẻ hơn).", evidence: ["younger"] },
        { speaker: "Soo Mi", en: "How much younger?", vi: "Trẻ hơn bao nhiêu?" },
        { speaker: "Steve", en: "Oh, I think some people get married before the age of 20.", vi: "Ồ, mình nghĩ một số người kết hôn trước tuổi 20.", evidence: ["20"] },
        { speaker: "Soo Mi", en: "Really? What else?", vi: "Thật sao? Còn gì nữa?" },
        { speaker: "Steve", en: "A lot of women work after they get married. And I think most women who have babies go back to work fairly soon too.", vi: "Rất nhiều phụ nữ đi làm sau khi kết hôn. Và mình nghĩ hầu hết phụ nữ sinh con cũng quay lại đi làm khá sớm.", evidence: ["get married", "to work"] },
        { speaker: "Soo Mi", en: "Yes, according to the survey, 50% of American working women return to work within a year of having a baby.", vi: "Đúng vậy, theo khảo sát, 50% phụ nữ đi làm ở Mỹ quay lại công việc trong vòng một năm sau khi sinh con." },
        { speaker: "Steve", en: "Do women in Korea usually work after they get married?", vi: "Phụ nữ ở Hàn Quốc có thường đi làm sau khi kết hôn không?" },
        { speaker: "Soo Mi", en: "No. A lot of women stay at home and take care of their families but a few work.", vi: "Không. Rất nhiều phụ nữ ở nhà chăm sóc gia đình, chỉ một số ít đi làm.", evidence: ["stay at home"] },
        { speaker: "Steve", en: "I see. Here are some more figures. It says 67% of women with children work. And 57% of children under six have two parents who work or a single parent who works.", vi: "Mình hiểu rồi. Đây có thêm vài số liệu nữa. Bài viết nói 67% phụ nữ có con đi làm. Và 57% trẻ em dưới sáu tuổi có cả bố mẹ đi làm hoặc bố/mẹ đơn thân đi làm.", evidence: ["67%", "57%"] }
      ],
      scriptVocabTitle: "Từ vựng bổ trợ trong bài",
      scriptVocab: [
        { word: "divorce", match: "divorce", pos: "n/v", vi: "sự ly hôn / ly dị" },
        { word: "figures", match: "figures", pos: "n", vi: "số liệu thống kê" }
      ]
    },

    // ========================================================================
    // EXERCISE 8 — University campus (60.MP3)
    // ========================================================================
    {
      id: "ex-08",
      num: "08",
      sectionGroup: "section1",
      title: "University campus",
      titleVi: "Chỉ đường & dán nhãn bản đồ khuôn viên đại học",
      ieltsPart: "IELTS Part 2",
      questionType: "Map Labelling (Dán nhãn bản đồ)",
      shortType: "Map Labelling",
      trackFile: "60.mp3",
      trackLabel: "60.MP3",
      duration: "03:15",
      icon: "fa-map-marked-alt",
      themeBadge: "CAMPUS DIRECTIONS",
      themeColor: "#CCFBF1",
      instruction: "Look at the map of the university campus. You will hear 5 sets of directions to a certain place. As you listen, follow the directions carefully, then write the letters (A–K) next to the names of the places below.",
      wordLimit: "ONE LETTER ONLY (A–K)",
      wordBank: [
        { word: "Administration Building", ipa: "/ədˌmɪn.ɪˈstreɪ.ʃən/", vi: "tòa nhà hành chính" },
        { word: "Gymnasium", ipa: "/dʒɪmˈneɪ.zi.əm/", vi: "nhà thi đấu" },
        { word: "opposite", ipa: "/ˈɒp.ə.zɪt/", vi: "đối diện" },
        { word: "Recreation Centre", ipa: "/ˌrek.riˈeɪ.ʃən/", vi: "trung tâm giải trí" },
        { word: "cafeteria", ipa: "/ˌkæf.əˈtɪə.ri.ə/", vi: "quán ăn tự phục vụ" },
        { word: "signpost", ipa: "/ˈsaɪn.pəʊst/", vi: "biển chỉ đường" }
      ],
      tips: [
        "CHIẾN THUẬT MAP LABELLING: Trước khi nghe, xác định ngay điểm xuất phát ('Entrance' ở phía dưới cùng) và các mốc cố định đã có tên sẵn (Students Union, Gymnasium, Sports Centre, Swimming Pool, Library, Recreation Centre, Cinema).",
        "Mẹo hay: Bạn có thể bấm trực tiếp vào ô chữ cái (A–K) trên bản đồ tương tác để điền nhanh vào câu đang chọn!",
        "Chú ý hướng nhìn thay đổi theo vị trí: ở Hội thoại 2 người nói đang đứng tại Administration Building (A) nhìn sang Gymnasium."
      ],
      worksheet: {
        kind: "campus-map",
        places: [
          { id: "1", num: "1", name: "Administration Building" },
          { id: "2", num: "2", name: "Bookstore" },
          { id: "3", num: "3", name: "Tennis Club" },
          { id: "4", num: "4", name: "Computer Centre" },
          { id: "5", num: "5", name: "Cafeteria" }
        ]
      },
      questions: [
        { id: "1", label: "1. Administration Building", answerDisplay: "A", accepted: ["a"], explanation: "Hội thoại 1: Đứng ở Entrance, đối diện là Students Union, tòa nhà bên tay trái là Administration Building → A." },
        { id: "2", label: "2. Bookstore", answerDisplay: "C", accepted: ["c"], explanation: "Hội thoại 2: Đứng tại A nhìn về Gymnasium, Bookstore nằm phía sau Gymnasium, giữa Cinema và Bank (B) → C." },
        { id: "3", label: "3. Tennis Club", answerDisplay: "H", accepted: ["h"], explanation: "Hội thoại 3: Trong Sports Centre có Swimming Pool, Tennis Club nằm đối diện bể bơi và cạnh sân chơi (hình bầu dục) → H." },
        { id: "4", label: "4. Computer Centre", answerDisplay: "I", accepted: ["i"], explanation: "Hội thoại 4: Computer Centre nằm ngay cạnh Library và đối diện Recreation Centre → I." },
        { id: "5", label: "5. Cafeteria", answerDisplay: "E", accepted: ["e"], explanation: "Hội thoại 5: Trong Recreation Centre có 3 tòa nhà (D, E, F). Tòa ở giữa có Cafeteria → E." }
      ],
      tapescript: [
        {
          speaker: "CONVERSATION 1 (Susan goes to register.)",
          en: "A: Excuse me. Can you help me? I'm looking for the Registration Office. — B: Maybe I can. I think it's in the Administration Building. Are you a new student? — A: Yes, I am. — B: Well, look, here is the map of the campus. We're at the entrance now. The building we face is the Students Union, the building on our left is the Administration Building. — A: Thank you. — B: With pleasure.",
          vi: "A: Xin lỗi, bạn giúp mình được không? Mình đang tìm Văn phòng Đăng ký. — B: Có thể đấy. Mình nghĩ nó ở trong Tòa nhà Hành chính. Bạn là sinh viên mới à? — A: Đúng rồi. — B: Nhìn này, đây là bản đồ khuôn viên. Giờ ta đang ở cổng vào. Tòa nhà trước mặt là Hội Sinh viên, tòa nhà bên tay trái là Tòa nhà Hành chính (A). — A: Cảm ơn bạn. — B: Rất hân hạnh.",
          evidence: ["on our left is the Administration Building"]
        },
        {
          speaker: "CONVERSATION 2 (Susan wants to buy course books.)",
          en: "A: Excuse me. I'm a new student here. I'm looking for the bookstore. Do you know where it is? — B: The bookstore? Let me see. We are at the Administration Building. Do you see Gymnasium there, the one facing us on the left? — A: Yes, is the tall white building over there? — B: Right. The bookstore is behind the gymnasium, between the cinema and the bank. — A: I see. Thank you very much. — B: You are welcome.",
          vi: "A: Xin lỗi, mình là sinh viên mới. Mình đang tìm hiệu sách. Bạn có biết nó ở đâu không? — B: Hiệu sách à? Để xem nào. Ta đang ở Tòa nhà Hành chính. Bạn có thấy Nhà thi đấu ở kia, tòa hướng mặt về phía ta bên trái không? — A: Có, có phải tòa nhà cao màu trắng đằng kia không? — B: Đúng rồi. Hiệu sách nằm phía sau nhà thi đấu, giữa rạp chiếu phim và ngân hàng (C). — A: Mình hiểu rồi. Cảm ơn nhiều nhé. — B: Không có gì.",
          evidence: ["behind the gymnasium, between the cinema and the bank"]
        },
        {
          speaker: "CONVERSATION 3 (Susan plans to go to the tennis club.)",
          en: "A: Excuse me, could you tell me where the tennis club is? — B: Tennis Club? ... er ... I think it is in the Sports Centre. When you go to the sports centre, you will find a swimming pool. The tennis club is opposite it, next to the playground. You can't miss it. — A: Thanks a lot.",
          vi: "A: Xin lỗi, bạn chỉ giúp mình câu lạc bộ tennis ở đâu được không? — B: Câu lạc bộ Tennis à? ... ừm ... mình nghĩ nó ở trong Trung tâm Thể thao. Khi bạn vào trung tâm thể thao, bạn sẽ thấy một bể bơi. Câu lạc bộ tennis nằm đối diện bể bơi, ngay cạnh sân chơi (H). Bạn không thể bỏ lỡ đâu. — A: Cảm ơn nhiều nhé.",
          evidence: ["in the Sports Centre", "opposite it, next to the playground"]
        },
        {
          speaker: "CONVERSATION 4",
          en: "A: Excuse me, I'm looking for the computer centre. Could you tell me where it is? — B: The Computer Centre? Yes, it's next to the library, opposite the recreation centre. — A: Next to the library, opposite the recreation centre. — B: Yes, that's right. — A: Thank you very much.",
          vi: "A: Xin lỗi, mình đang tìm trung tâm máy tính. Bạn chỉ giúp mình nó ở đâu được không? — B: Trung tâm Máy tính à? Nó nằm ngay cạnh thư viện, đối diện trung tâm giải trí (I). — A: Cạnh thư viện, đối diện trung tâm giải trí. — B: Vâng, đúng rồi. — A: Cảm ơn bạn rất nhiều.",
          evidence: ["next to the library, opposite the recreation centre"]
        },
        {
          speaker: "CONVERSATION 5",
          en: "A: Excuse me, could you tell me where the cafeteria is? — B: Oh, cafeteria? I think there is one in the recreation centre. — A: Recreation centre? — B: Yes, when you come to the recreation centre, you will see three buildings there. The middle one has a cafeteria. You can see a big signpost there. You can't miss it. — A: Thank you very much.",
          vi: "A: Xin lỗi, bạn chỉ giúp mình căng-tin ở đâu được không? — B: Ồ, căng-tin à? Mình nghĩ có một cái trong trung tâm giải trí. — A: Trung tâm giải trí á? — B: Ừ, khi bạn đến trung tâm giải trí, bạn sẽ thấy ba tòa nhà ở đó. Tòa ở giữa có căng-tin (E). Bạn sẽ thấy một biển chỉ đường lớn ở đó. Không thể nhầm được. — A: Cảm ơn nhiều nhé.",
          evidence: ["three buildings there. The middle one has a cafeteria"]
        }
      ],
      scriptVocabTitle: "Từ vựng gạch chân trong Script",
      scriptVocab: [
        { word: "Registration Office", match: "Registration Office", pos: "n.p", vi: "văn phòng đăng ký (nhập học)" },
        { word: "Administration Building", match: "Administration Building", pos: "n.p", vi: "tòa nhà hành chính / hiệu bộ" },
        { word: "Gymnasium", match: "Gymnasium", pos: "n", vi: "nhà thi đấu / phòng tập đa năng" },
        { word: "recreation centre", match: "recreation centre", pos: "n.p", vi: "trung tâm giải trí, sinh hoạt" },
        { word: "cafeteria", match: "cafeteria", pos: "n", vi: "quán ăn tự phục vụ / căng-tin" },
        { word: "signpost", match: "signpost", pos: "n", vi: "biển chỉ dẫn, cột chỉ đường" }
      ]
    },

    // ========================================================================
    // EXERCISE 9 — Music in New Orleans (61.MP3)
    // ========================================================================
    {
      id: "ex-09",
      num: "09",
      sectionGroup: "section2",
      title: "Music in New Orleans",
      titleVi: "Lịch sử nhạc Jazz tại New Orleans",
      ieltsPart: "IELTS Part 3/4",
      questionType: "Summary Completion (Điền tóm tắt)",
      shortType: "Summary Completion",
      trackFile: "61.mp3",
      trackLabel: "61.MP3",
      duration: "02:40",
      icon: "fa-music",
      themeBadge: "NEW ORLEANS JAZZ",
      themeColor: "#FEF3C7",
      instruction: "Listen to the conversation and fill in the missing information in the notes below.",
      wordLimit: "",
      wordBank: [
        { word: "musicians", ipa: "/mjuːˈzɪʃ.ənz/", vi: "các nhạc công" },
        { word: "African American", ipa: "/ˈæf.rɪ.kən/", vi: "người Mỹ gốc Phi" },
        { word: "relaxed beat", ipa: "/rɪˈlækst biːt/", vi: "nhịp điệu thư giãn" },
        { word: "spread", ipa: "/spred/", vi: "lan truyền rộng" },
        { word: "swing", ipa: "/swɪŋ/", vi: "nhạc swing" },
        { word: "audience", ipa: "/ˈɔː.di.əns/", vi: "khán giả" },
        { word: "special requests", ipa: "/rɪˈkwests/", vi: "yêu cầu bài hát" }
      ],
      tips: [
        "Theo dõi mốc thời gian làm 'mỏ neo' (Signposts): Around 1900 → Around 1920 → In the 1930s and 1940s → Now.",
        "Chú ý số nhiều: 'white musicians' (5), 'very old musicians' (9), 'special requests' (11), '1930s and 1940s' (7).",
        "Câu (10) là khoảng thời gian chơi nhạc mỗi tối: '4 and a half hours' / 'four and a half hours'."
      ],
      worksheet: {
        kind: "cloze",
        blocks: [
          {
            type: "paragraph",
            html:
              "Around 1900, people from many countries lived in New Orleans. {{1}} was an important part of life in this city. Musicians in New Orleans started to play a different kind of music. It was called {{2}}. Most early jazz musicians were {{3}}. They played in small bands and they didn't write down their music. They learned to work together to produce a loose and {{4}} that was so powerful that listeners could not help but dance, or at least move their feet along with the music. Soon {{5}} were playing jazz too."
          },
          {
            type: "paragraph",
            html:
              "Around 1920, jazz music began to {{6}}. Jazz musicians moved from city to city. People listened to jazz records. They heard jazz on the radio. In the {{7}}, jazz was popular in the U.S. and Canada. The music was called {{8}}. It was played by big bands. Now, there are still a few bands made up of {{9}} playing the old-style jazz in a club in New Orleans. They play jazz for {{10}} each evening so many tourists go there. The audience can make some {{11}} for the songs, but they should pay a little {{12}} for the request."
          }
        ]
      },
      questions: [
        { id: "1", label: "Câu 1", answerDisplay: "Music", accepted: ["music"], explanation: "B nói: 'Music was an important part of life in this city.'" },
        { id: "2", label: "Câu 2", answerDisplay: "jazz", accepted: ["jazz"], explanation: "B nói: 'It was called jazz.'" },
        { id: "3", label: "Câu 3", answerDisplay: "African American", accepted: ["african american", "african-american", "african americans"], explanation: "A nói: 'Most early jazz musicians were African American.'" },
        { id: "4", label: "Câu 4", answerDisplay: "relaxed beat", accepted: ["relaxed beat"], explanation: "B nói: '...produce a loose and relaxed beat...'" },
        { id: "5", label: "Câu 5", answerDisplay: "white musicians", accepted: ["white musicians"], explanation: "B nói: 'And soon white musicians were playing jazz too.'" },
        { id: "6", label: "Câu 6", answerDisplay: "spread", accepted: ["spread"], explanation: "B nói: 'Around 1920, jazz music began to spread.'" },
        { id: "7", label: "Câu 7", answerDisplay: "1930s and 1940s", accepted: ["1930s and 1940s", "1930s & 1940s", "1930's and 1940's", "30s and 40s"], explanation: "B nói: 'In the 1930s and 1940s, jazz was popular in the U.S. and Canada.'" },
        { id: "8", label: "Câu 8", answerDisplay: "swing", accepted: ["swing"], explanation: "B nói: 'The music was called swing.'" },
        { id: "9", label: "Câu 9", answerDisplay: "very old musicians", accepted: ["very old musicians", "old musicians"], explanation: "A nói: '...made up of very old musicians playing the old-style jazz...'" },
        { id: "10", label: "Câu 10", answerDisplay: "4 and a half hours", accepted: ["4 and a half hours", "four and a half hours", "4.5 hours", "4 1/2 hours", "4½ hours"], explanation: "A nói: 'They play jazz for four and a half hours each evening...'" },
        { id: "11", label: "Câu 11", answerDisplay: "special requests", accepted: ["special requests"], explanation: "B hỏi: 'Can the audience make some special requests for the songs?'" },
        { id: "12", label: "Câu 12", answerDisplay: "money", accepted: ["money"], explanation: "A trả lời: '...people pay a little money for the request.'" }
      ],
      tapescript: [
        { speaker: "A", en: "Hi, Mike. Do you like jazz?", vi: "Chào Mike. Bạn có thích nhạc jazz không?" },
        { speaker: "B", en: "Yes, very much. And I like to dance to jazz too.", vi: "Có, rất thích luôn. Mình cũng thích nhảy theo nhạc jazz nữa." },
        { speaker: "A", en: "Do you know who first started to play jazz?", vi: "Bạn có biết ai là những người đầu tiên chơi nhạc jazz không?" },
        { speaker: "B", en: "Yes, of course. The African Americans.", vi: "Biết chứ, tất nhiên rồi. Người Mỹ gốc Phi." },
        { speaker: "A", en: "Do you know when and where?", vi: "Bạn có biết từ khi nào và ở đâu không?" },
        { speaker: "B", en: "Yes. Around 1900, people from many countries lived in New Orleans. Music was an important part of life in this city. Musicians in New Orleans started to play a different kind of music. It was called jazz. Jazz was a kind of music intended to make people happy.", vi: "Có. Khoảng năm 1900, người dân từ nhiều quốc gia sinh sống tại New Orleans. Âm nhạc là một phần quan trọng của cuộc sống ở thành phố này. Các nhạc công ở New Orleans bắt đầu chơi một dòng nhạc khác biệt, gọi là jazz. Jazz là loại âm nhạc nhằm mang lại niềm vui cho mọi người.", evidence: ["Music", "jazz"] },
        { speaker: "A", en: "I know jazz is kind of a mixture of many different kinds of music, for example, African, blues, European, church music, and work songs. Most early jazz musicians were African American. They played in small bands and they didn't write down their music.", vi: "Mình biết jazz là sự pha trộn của nhiều thể loại nhạc khác nhau, ví dụ nhạc châu Phi, blues, châu Âu, nhạc nhà thờ và các bài hát lao động. Hầu hết nhạc công jazz thời đầu là người Mỹ gốc Phi. Họ chơi trong các ban nhạc nhỏ và không chép bản nhạc ra giấy.", evidence: ["African American"] },
        { speaker: "B", en: "Yes, they learned to work together to produce a loose and relaxed beat that was so powerful that listeners could not help but dance, or at least move their feet along with it. And soon white musicians were playing jazz too.", vi: "Đúng vậy, họ học cách phối hợp để tạo ra một nhịp điệu phóng khoáng và thư giãn mạnh mẽ đến mức người nghe không thể không nhún nhảy, hoặc ít nhất cũng nhịp chân theo điệu nhạc. Và chẳng bao lâu sau các nhạc công da trắng cũng bắt đầu chơi jazz.", evidence: ["relaxed beat", "white musicians"] },
        { speaker: "A", en: "I know black and white musicians seldom played together in the United States at that time.", vi: "Mình biết hồi đó nhạc công da đen và da trắng ở Mỹ hiếm khi chơi chung với nhau." },
        { speaker: "B", en: "You are right. Around 1920, jazz music began to spread. Jazz musicians moved from city to city. People listened to jazz records. They heard jazz on the radio. In the 1930s and 1940s, jazz was popular in the U.S. and Canada. The music was called swing. It was played by big bands.", vi: "Bạn nói đúng. Khoảng năm 1920, nhạc jazz bắt đầu lan rộng. Các nhạc công đi từ thành phố này sang thành phố khác. Mọi người nghe đĩa nhạc jazz và nghe trên đài phát thanh. Vào thập niên 1930 và 1940, jazz rất phổ biến ở Mỹ và Canada. Dòng nhạc đó gọi là swing, được chơi bởi các ban nhạc lớn.", evidence: ["spread", "1930s and 1940s", "swing"] },
        { speaker: "A", en: "It was said there are still a few bands made up of very old musicians playing the old-style jazz in a club in New Orleans. They play jazz for four and a half hours each evening so many tourists go there and listen.", vi: "Nghe nói hiện vẫn còn vài ban nhạc gồm những nhạc công rất cao tuổi chơi jazz cổ điển tại một câu lạc bộ ở New Orleans. Họ chơi jazz suốt bốn tiếng rưỡi mỗi tối nên rất nhiều du khách tới đó thưởng thức.", evidence: ["very old musicians", "four and a half hours"] },
        { speaker: "B", en: "Can the audience make some special requests for the songs?", vi: "Khán giả có thể đưa ra yêu cầu đặc biệt về bài hát không?", evidence: ["special requests"] },
        { speaker: "A", en: "Yes, if the musicians are willing to play them, people pay a little money for the request. Traditional songs cost one dollar and all others cost two.", vi: "Có, nếu các nhạc công đồng ý chơi, khán giả sẽ trả một chút tiền cho yêu cầu đó. Bài hát truyền thống giá một đô la và các bài khác giá hai đô la.", evidence: ["money"] },
        { speaker: "B", en: "That's interesting. I'd like to visit the city sometime in the future.", vi: "Thú vị thật đấy. Mình muốn ghé thăm thành phố này vào một dịp nào đó trong tương lai." }
      ],
      scriptVocabTitle: "Từ vựng gạch chân trong Script",
      scriptVocab: [
        { word: "Musicians", match: "Musicians", pos: "n", vi: "các nhạc công, nhạc sĩ" },
        { word: "audience", match: "audience", pos: "n", vi: "khán giả, thính giả" }
      ]
    },

    // ========================================================================
    // EXERCISE 10 — Talking to a landlady (62.MP3)
    // ========================================================================
    {
      id: "ex-10",
      num: "10",
      sectionGroup: "section2",
      title: "Talking to a landlady",
      titleVi: "Hỏi nội quy phòng trọ với bà chủ nhà",
      ieltsPart: "IELTS Part 1",
      questionType: "Table Completion (Điền bảng)",
      shortType: "Table Completion",
      trackFile: "62.mp3",
      trackLabel: "62.MP3",
      duration: "TTS / 62.MP3",
      icon: "fa-house-user",
      themeBadge: "HOUSE RULES (LODGER)",
      themeColor: "#FEE2E2",
      instruction: "Mrs. Tiger's new lodger is asking what he is allowed to do. Listen to the conversation and mark (✗) if it is not allowed, or fill in the condition in the right column.",
      wordLimit: "",
      wordBank: [
        { word: "lodger", ipa: "/ˈlɒdʒ.ər/", vi: "người thuê trọ" },
        { word: "sellotape", ipa: "/ˈsel.ə.teɪp/", vi: "băng dính trong" },
        { word: "under no circumstances", ipa: "/ˈsɜː.kəm.stæns/", vi: "tuyệt đối không" },
        { word: "on condition that", ipa: "/kənˈdɪʃ.ən/", vi: "với điều kiện là" },
        { word: "midnight", ipa: "/ˈmɪd.naɪt/", vi: "nửa đêm (12h đêm)" },
        { word: "disturb", ipa: "/dɪˈstɜːb/", vi: "làm phiền" },
        { word: "except", ipa: "/ɪkˈsept/", vi: "ngoại trừ" }
      ],
      tips: [
        "Nghe các cụm từ chỉ sự cấm đoán tuyệt đối ('don't allow... anywhere', 'Under no circumstances') → bấm đánh dấu (✗) ở cột 'Not allowed'.",
        "Nghe các cụm chỉ điều kiện giới hạn ('only before...', 'on condition that...', 'only two or three...', 'except between...') → ghi ngắn gọn điều kiện vào cột bên phải.",
        "Lưu ý: Nếu file 62.mp3 chưa có trong thư mục, thanh nghe sẽ tự động kích hoạt chế độ Đọc Hội Thoại bằng giọng tiếng Anh (AI Voice TTS) để bạn vẫn luyện nghe trọn vẹn!"
      ],
      worksheet: {
        kind: "landlady-table",
        exampleRow: {
          item: "Posters on the walls",
          condition: "Yes, but don't use sellotape"
        },
        rows: [
          { id: "1", item: "Smoke", expectedType: "not_allowed" },
          { id: "2", item: "Cook in the kitchen", expectedType: "condition", placeholder: "VD: Only before 7 p.m." },
          { id: "3", item: "Pets", expectedType: "not_allowed" },
          { id: "4", item: "Watch TV", expectedType: "condition", placeholder: "VD: Not after midnight" },
          { id: "5", item: "Have friends to visit", expectedType: "condition", placeholder: "VD: Only 2–3 friends at a time" },
          { id: "6", item: "Have a bath", expectedType: "condition", placeholder: "VD: Except between 6 and 7 p.m." }
        ]
      },
      questions: [
        { id: "1", label: "Smoke", answerDisplay: "Not allowed (✗)", accepted: ["not_allowed"], kind: "landlady-disallow", explanation: "Bà chủ nhà nói: 'No, I'm afraid I don't allow smoking anywhere in the house.'" },
        { id: "2", label: "Cook in the kitchen", answerDisplay: "Only before 7 p.m.", accepted: ["only before 7 p.m."], matcher: "regex", pattern: "(before|not\\s+after).*(7|seven)", explanation: "Bà chủ nhà nói: 'Yes, but only before 7 o'clock in the evening. Not after 7 o'clock.'" },
        { id: "3", label: "Pets", answerDisplay: "Not allowed (✗)", accepted: ["not_allowed"], kind: "landlady-disallow", explanation: "Bà chủ nhà nhấn mạnh: 'Under no circumstances do I want any pets here.'" },
        { id: "4", label: "Watch TV", answerDisplay: "Not after midnight", accepted: ["not after midnight"], matcher: "regex", pattern: "(midnight|12)", explanation: "Bà chủ nhà nói: 'Yes, on condition that you don't have it on after midnight.'" },
        { id: "5", label: "Have friends to visit", answerDisplay: "Only 2–3 friends at a time (no noisy parties)", accepted: ["only 2-3 friends"], matcher: "regex", pattern: "((2|two).*(3|three)|no\\s+(big\\s+)?noisy|no\\s+part)", explanation: "Bà chủ nhà nói: '...no big noisy parties though, so only two or three friends at the same time, please.'" },
        { id: "6", label: "Have a bath", answerDisplay: "Except between 6 and 7 in the evening", accepted: ["except between 6 and 7"], matcher: "regex", pattern: "(6|six).*(7|seven)", explanation: "Bà chủ nhà nói: 'Yes, except between 6 and 7 in the evening.'" }
      ],
      tapescript: [
        { speaker: "A", en: "Good afternoon. I'm Sam. I phoned yesterday about the room. Is it still available?", vi: "Chào buổi chiều. Cháu là Sam. Hôm qua cháu đã gọi điện hỏi về căn phòng. Phòng vẫn còn trống chứ ạ?" },
        { speaker: "B", en: "Yes, come in please.", vi: "Vâng, mời cậu vào nhà." },
        { speaker: "A", en: "The room is very nice and big. Do you mind if I put some posters on the walls?", vi: "Phòng đẹp và rộng quá. Bác có phiền nếu cháu dán vài tấm áp phích lên tường không ạ?" },
        { speaker: "B", en: "No, I don't mind, but don't use sellotape to stick them up. It brings off the paint when you remove it.", vi: "Không, bác không phiền, nhưng đừng dùng băng dính trong để dán nhé. Lúc gỡ ra nó sẽ làm bong sơn đấy." },
        { speaker: "A", en: "What about smoking? Is it alright if my friends and I smoke?", vi: "Còn việc hút thuốc thì sao ạ? Bạn cháu và cháu hút thuốc có được không?" },
        { speaker: "B", en: "No, I'm afraid I don't allow smoking anywhere in the house.", vi: "Không, bác e là bác không cho phép hút thuốc ở bất cứ đâu trong nhà.", evidence: ["don't allow smoking anywhere"] },
        { speaker: "A", en: "I see. Can I use the kitchen if I want to cook something?", vi: "Cháu hiểu rồi. Cháu có thể dùng bếp nếu muốn nấu gì đó không ạ?" },
        { speaker: "B", en: "Yes, but only before 7 o'clock in the evening. Not after 7 o'clock.", vi: "Được, nhưng chỉ trước 7 giờ tối thôi. Không nấu sau 7 giờ tối.", evidence: ["only before 7 o'clock in the evening"] },
        { speaker: "A", en: "I'm very fond of animals and I'm thinking of getting a dog.", vi: "Cháu rất thích động vật và đang định nuôi một chú chó." },
        { speaker: "B", en: "Under no circumstances do I want any pets here. I don't like animals.", vi: "Trong bất kỳ hoàn cảnh nào bác cũng tuyệt đối không cho nuôi thú cưng ở đây. Bác không thích động vật.", evidence: ["Under no circumstances do I want any pets here"] },
        { speaker: "A", en: "Well, you said I could use your television in the evening. Is that right?", vi: "À, bác nói cháu có thể xem tivi vào buổi tối. Đúng không ạ?" },
        { speaker: "B", en: "Yes, on condition that you don't have it on after midnight. We don't want to disturb the neighbours.", vi: "Đúng vậy, với điều kiện là cháu không bật tivi sau nửa đêm. Chúng ta không muốn làm phiền hàng xóm.", evidence: ["don't have it on after midnight"] },
        { speaker: "A", en: "Can I have my friends round in the evening?", vi: "Cháu có thể mời bạn đến chơi buổi tối không ạ?" },
        { speaker: "B", en: "Yes, that's OK, but we don't want any big noisy parties though, so only two or three friends at the same time, please.", vi: "Được thôi, nhưng bác không muốn tiệc tùng ồn ào đâu nhé, nên làm ơn chỉ mời hai hoặc ba người bạn cùng lúc thôi.", evidence: ["only two or three friends at the same time"] },
        { speaker: "A", en: "Can I have a bath at any time?", vi: "Cháu có thể tắm vào bất cứ lúc nào không ạ?" },
        { speaker: "B", en: "Yes, except between 6 and 7 in the evening. I get home from work then and I always like to have a shower before I have my evening meal.", vi: "Được, ngoại trừ khoảng từ 6 đến 7 giờ tối. Lúc đó bác đi làm về và bác luôn thích tắm trước khi ăn tối.", evidence: ["except between 6 and 7 in the evening"] }
      ],
      scriptVocabTitle: "Từ vựng gạch chân trong Script",
      scriptVocab: [
        { word: "posters", match: "posters", pos: "n", vi: "áp phích, tranh dán tường" },
        { word: "sellotape", match: "sellotape", pos: "n", vi: "băng dính trong" },
        { word: "circumstances", match: "circumstances", pos: "n", vi: "hoàn cảnh (under no ~: tuyệt đối không)" },
        { word: "disturb", match: "disturb", pos: "v", vi: "làm phiền, quấy rầy" },
        { word: "except", match: "except", pos: "prep", vi: "ngoại trừ" }
      ]
    },

    // ========================================================================
    // EXERCISE 11 — The news (63.MP3)
    // ========================================================================
    {
      id: "ex-11",
      num: "11",
      sectionGroup: "section2",
      title: "The news",
      titleVi: "Bản tin thời sự: Động đất & Du khách vũ trụ",
      ieltsPart: "IELTS Part 2/4",
      questionType: "Pick from a List & Summary",
      shortType: "Pick from a List & Summary",
      trackFile: "63.mp3",
      trackLabel: "63.MP3",
      duration: "03:02",
      icon: "fa-newspaper",
      themeBadge: "6:00 NEWS · QUAKE 6.8",
      themeColor: "#FEE2E2",
      instruction: "Question 1: Tick (✓) the three items mentioned in the news headlines. Questions 2–14: Fill in the gaps by writing NO MORE THAN THREE WORDS.",
      wordLimit: "NO MORE THAN THREE WORDS",
      wordBank: [
        { word: "earthquake", ipa: "/ˈɜːθ.kweɪk/", vi: "trận động đất" },
        { word: "on strike", ipa: "/straɪk/", vi: "đình công" },
        { word: "magnitude", ipa: "/ˈmæɡ.nɪ.tjuːd/", vi: "độ lớn động đất" },
        { word: "southeast", ipa: "/ˌsaʊθˈiːst/", vi: "hướng đông nam" },
        { word: "serious condition", ipa: "/ˈsɪə.ri.əs/", vi: "tình trạng nguy kịch" },
        { word: "sway", ipa: "/sweɪ/", vi: "rung lắc" },
        { word: "minimal", ipa: "/ˈmɪn.ɪ.məl/", vi: "tối thiểu, rất nhỏ" },
        { word: "green light", ipa: "/ɡriːn laɪt/", vi: "bật đèn xanh (cho phép)" },
        { word: "final exam", ipa: "/ɪɡˈzæm/", vi: "kỳ thi sát hạch cuối" }
      ],
      tips: [
        "Ở Question 1 (chọn 3 tiêu đề tin chính), cẩn thận bẫy paraphrase: 'Transport workers are on strike in Vancouver... spread to all of BC' tương ứng với E ('Bus drivers strike threats British Columbia'), không phải D (Nurses) hay F (ocean tourist).",
        "Nghe chính xác các con số trong bản tin: 10:54 a.m. (2), 6.8 (3), 250 (5), 60 (11), 20 million (13).",
        "Lưu ý câu (13) đã có sẵn từ 'dollars' phía sau ô trống, nên chỉ điền '20 million' (hoặc '20 million U.S.')."
      ],
      worksheet: {
        kind: "news-mixed",
        headlinesTitle: "Question 1 — Listen to the news and tick (✓) the THREE items which are mentioned in the news headlines.",
        headlines: [
          { key: "A", text: "Two planes crashed in North America" },
          { key: "B", text: "Bush fire out of control in West Alabama" },
          { key: "C", text: "A powerful earthquake rocked Seattle and rolled Victoria" },
          { key: "D", text: "Nurses on strike in Vancouver" },
          { key: "E", text: "Bus drivers strike threats British Columbia" },
          { key: "F", text: "Millionaire to become first ocean tourist" },
          { key: "G", text: "Millionaire to become first space tourist" }
        ],
        expectedHeadlines: ["C", "E", "G"],
        clozeTitle: "Questions 2–14 — Fill in the gaps numbered 2–14 below by writing NO MORE THAN THREE WORDS.",
        blocks: [
          {
            type: "paragraph",
            html:
              "A strong earthquake hit Seattle at {{2}} on Wednesday. According to the National Earthquake Information Centre in Golden, the magnitude {{3}} quake was centred 125 kilometres {{4}} of Victoria and 56 kilometres southwest of Seattle. About {{5}} people were reported injured in Seattle and Olympia, at least three of them are in {{6}} condition. In Victoria, the earthquake caused {{7}} to sway and shook {{8}} off walls but damage was {{9}}."
          },
          {
            type: "paragraph",
            html:
              "Russian officials gave the {{10}} to California millionaire Dennis Tito to become the first tourist in space. Tito is {{11}} years old. He took his {{12}}. Tito will reportedly pay {{13}} dollars for the flight. He will spend about {{14}} on the station."
          }
        ]
      },
      questions: [
        { id: "1", label: "Q1 (Headlines)", answerDisplay: "C, E, G", accepted: ["C,E,G"], kind: "multi-pick", expectedSet: ["C", "E", "G"], explanation: "3 điểm tin chính: Động đất ở Seattle/Victoria (C), đình công giao thông lan rộng BC (E), và triệu phú Dennis Tito thành du khách vũ trụ đầu tiên (G)." },
        { id: "2", label: "Câu 2", answerDisplay: "10:54 a.m.", accepted: ["10:54 a.m.", "10:54 am", "10.54 a.m.", "10.54 am", "10:54"], explanation: "Bản tin đọc: 'A strong earthquake hit Seattle at 10:54 a.m. on Wednesday.'" },
        { id: "3", label: "Câu 3", answerDisplay: "6.8", accepted: ["6.8"], explanation: "Bản tin đọc: '...the magnitude 6.8 quake...'" },
        { id: "4", label: "Câu 4", answerDisplay: "southeast", accepted: ["southeast", "south-east", "south east"], explanation: "Bản tin đọc: '...centred 125 kilometres southeast of Victoria...'" },
        { id: "5", label: "Câu 5", answerDisplay: "250", accepted: ["250", "two hundred and fifty", "two hundred fifty"], explanation: "Bản tin đọc: 'About 250 people were reported injured...'" },
        { id: "6", label: "Câu 6", answerDisplay: "serious", accepted: ["serious"], explanation: "Bản tin đọc: '...at least three of them are in serious condition.'" },
        { id: "7", label: "Câu 7", answerDisplay: "buildings", accepted: ["buildings"], explanation: "Bản tin đọc: '...the earthquake caused buildings to sway...'" },
        { id: "8", label: "Câu 8", answerDisplay: "pictures", accepted: ["pictures"], explanation: "Bản tin đọc: '...and shook pictures off walls...'" },
        { id: "9", label: "Câu 9", answerDisplay: "minimal", accepted: ["minimal"], explanation: "Bản tin đọc: '...but damage was minimal.'" },
        { id: "10", label: "Câu 10", answerDisplay: "green light", accepted: ["green light"], explanation: "Bản tin đọc: 'Russian officials gave the green light to California millionaire Dennis Tito...'" },
        { id: "11", label: "Câu 11", answerDisplay: "60", accepted: ["60", "sixty"], explanation: "Bản tin đọc: 'Tito, 60, the founder of an investment firm...'" },
        { id: "12", label: "Câu 12", answerDisplay: "final exam", accepted: ["final exam"], explanation: "Bản tin đọc: '...took his final exam.'" },
        { id: "13", label: "Câu 13", answerDisplay: "20 million", accepted: ["20 million", "20 million u.s.", "20 million us", "twenty million", "20,000,000"], explanation: "Bản tin đọc: 'Tito will reportedly pay 20 million U.S. dollars for the flight.'" },
        { id: "14", label: "Câu 14", answerDisplay: "a week", accepted: ["a week", "one week", "1 week"], explanation: "Bản tin đọc: 'He will spend about a week on the station...'" }
      ],
      tapescript: [
        {
          speaker: "News Anchor (Headlines)",
          en: "This is the 6 o'clock news for Thursday and first the headlines are: A powerful earthquake rocked the U.S. Northwest on Wednesday. Frightened people ran into the streets of Seattle. Earthquake officials said British Columbia felt the shock but escaped any serious damage. Transport workers are on strike in Vancouver over a pay claim and the strike looks set to spread to all of BC. In Moscow, Russian officials gave the green light on Wednesday to California millionaire Dennis Tito to become the first tourist in space.",
          vi: "Đây là bản tin 6 giờ thứ Năm và đầu tiên là các điểm tin chính: Một trận động đất mạnh đã làm rung chuyển vùng Tây Bắc Hoa Kỳ vào thứ Tư. Người dân hoảng sợ chạy ra đường phố Seattle. Giới chức động đất cho biết British Columbia cảm nhận được rung chấn nhưng tránh được thiệt hại nghiêm trọng. Công nhân ngành giao thông đang đình công tại Vancouver vì yêu sách tiền lương và cuộc đình công có nguy cơ lan ra toàn bang BC. Tại Moscow, các quan chức Nga hôm thứ Tư đã bật đèn xanh cho triệu phú người California Dennis Tito trở thành du khách đầu tiên vào không gian.",
          evidence: ["powerful earthquake rocked", "Transport workers are on strike", "first tourist in space"]
        },
        {
          speaker: "News Anchor (Earthquake Detail)",
          en: "Now, here is the news in detail. A strong earthquake hit Seattle at 10:54 a.m. on Wednesday. According to the National Earthquake Information Centre in Golden, the magnitude 6.8 quake was centred 125 kilometres southeast of Victoria and 56 kilometres southwest of Seattle. About 250 people were reported injured in Seattle and Olympia, at least three of them are in serious condition. In Victoria, the earthquake caused buildings to sway and shook pictures off walls but damage was minimal. Said Kay Smith, who was on the eighth floor of a downtown Victoria office building, \"I thought the building was going to sway and topple over.\" Yet others didn't feel a thing. A spokesman said that at least two local people had hospital treatment for minor injuries.",
          vi: "Sau đây là tin chi tiết. Một trận động đất mạnh đã tấn công Seattle lúc 10:54 sáng thứ Tư. Theo Trung tâm Thông tin Động đất Quốc gia tại Golden, trận động đất mạnh 6,8 độ có tâm chấn cách Victoria 125 km về phía đông nam và cách Seattle 56 km về phía tây nam. Khoảng 250 người được báo cáo bị thương ở Seattle và Olympia, ít nhất ba người trong tình trạng nguy kịch. Tại Victoria, trận động đất làm các tòa nhà rung lắc và khiến tranh ảnh rơi khỏi tường nhưng thiệt hại ở mức tối thiểu. Bà Kay Smith, khi đó ở tầng 8 một tòa nhà văn phòng trung tâm Victoria, kể: \"Tôi cứ tưởng tòa nhà sắp rung lắc rồi đổ sập xuống.\" Tuy nhiên những người khác lại không cảm thấy gì. Một phát ngôn viên cho biết ít nhất hai người dân địa phương đã vào viện điều trị vết thương nhẹ.",
          evidence: ["10:54 a.m.", "6.8", "southeast", "250", "serious", "buildings", "pictures", "minimal"]
        },
        {
          speaker: "News Anchor (Space Tourist Detail)",
          en: "Russian officials gave the green light to California millionaire Dennis Tito to become the first tourist in space despite reservations from NASA. Tito, 60, the founder of an investment firm, took his final exam. The Interdepartmental Committee, which routinely approves cosmonauts for space flight, included Tito in the primary crew set to launch on April 28 on a mission to the International Space Station. Tito will reportedly pay 20 million U.S. dollars for the flight. He will spend about a week on the station despite objections from NASA who felt that an amateur on board could jeopardise safety if there were an emergency.",
          vi: "Các quan chức Nga đã bật đèn xanh cho triệu phú California Dennis Tito trở thành du khách vũ trụ đầu tiên bất chấp sự dè dặt từ NASA. Ông Tito, 60 tuổi, nhà sáng lập một công ty đầu tư, đã tham gia kỳ thi sát hạch cuối cùng. Ủy ban Liên ngành — cơ quan thường xuyên phê duyệt các nhà du hành vũ trụ Nga cho chuyến bay không gian — đã đưa Tito vào phi hành đoàn chính dự kiến phóng ngày 28/4 tới Trạm Vũ trụ Quốc tế. Theo nguồn tin, Tito sẽ trả 20 triệu đô la Mỹ cho chuyến bay. Ông sẽ ở trên trạm khoảng một tuần bất chấp sự phản đối từ NASA, phía cho rằng một người nghiệp dư trên tàu có thể gây nguy hiểm cho an toàn nếu xảy ra tình huống khẩn cấp.",
          evidence: ["green light", "60", "final exam", "20 million", "a week"]
        }
      ],
      scriptVocabTitle: "Từ vựng gạch chân trong Script",
      scriptVocab: [
        { word: "earthquake", match: "earthquake", pos: "n", vi: "trận động đất" },
        { word: "escaped", match: "escaped", pos: "v", vi: "thoát khỏi, tránh được" },
        { word: "magnitude", match: "magnitude", pos: "n", vi: "độ lớn, cường độ (động đất)" },
        { word: "injured", match: "injured", pos: "adj", vi: "bị thương" },
        { word: "sway", match: "sway", pos: "v", vi: "rung lắc, đung đưa" },
        { word: "topple (over)", match: "topple over", pos: "v", vi: "đổ sập xuống, lật nhào" },
        { word: "reservations", match: "reservations", pos: "n", vi: "sự dè dặt, mối nghi ngại" },
        { word: "cosmonauts", match: "cosmonauts", pos: "n", vi: "các nhà du hành vũ trụ (Nga)" },
        { word: "crew", match: "crew", pos: "n", vi: "phi hành đoàn / thủy thủ đoàn" },
        { word: "objections", match: "objections", pos: "n", vi: "sự phản đối" },
        { word: "amateur", match: "amateur", pos: "n", vi: "người nghiệp dư, không chuyên" },
        { word: "jeopardise", match: "jeopardise", pos: "v", vi: "gây nguy hiểm, đe dọa" },
        { word: "emergency", match: "emergency", pos: "n", vi: "tình huống khẩn cấp" }
      ]
    },

    // ========================================================================
    // EXERCISE 12 — Some interesting places to go (64.MP3)
    // ========================================================================
    {
      id: "ex-12",
      num: "12",
      sectionGroup: "section2",
      title: "Some interesting places to go",
      titleVi: "Những địa điểm thú vị tại khu West End, London",
      ieltsPart: "IELTS Part 2",
      questionType: "Multiple Choice & Note Completion",
      shortType: "MCQ & Note Completion",
      trackFile: "64.mp3",
      trackLabel: "64.MP3",
      duration: "02:13",
      icon: "fa-landmark",
      themeBadge: "LONDON WEST END",
      themeColor: "#EDE9FE",
      instruction: "Questions 1–3: Listen to the talk and choose the right answers. Questions 4–12: Fill in the notes below.",
      wordLimit: "",
      wordBank: [
        { word: "department stores", ipa: "/dɪˈpɑːt.mənt/", vi: "trung tâm thương mại" },
        { word: "statue", ipa: "/ˈstætʃ.uː/", vi: "bức tượng" },
        { word: "night life", ipa: "/naɪt laɪf/", vi: "nhịp sống về đêm" },
        { word: "well known", ipa: "/wel nəʊn/", vi: "nổi tiếng" },
        { word: "disappointed", ipa: "/ˌdɪs.əˈpɔɪn.tɪd/", vi: "thất vọng" },
        { word: "foreign quarter", ipa: "/ˈfɒr.ən/", vi: "khu phố người nước ngoài" },
        { word: "live theatres", ipa: "/ˈθɪə.təz/", vi: "nhà hát kịch trực tiếp" }
      ],
      tips: [
        "Đọc nhanh các phương án A/B/C/D của Q1–Q3 trước khi nghe và gạch chân từ khóa phân biệt (Oxford Street + Regent Street vs Bond Street; Trafalgar Square vs Leicester Square).",
        "Chú ý địa danh viết hoa ở câu (8): 'Soho'.",
        "Câu (9) là thế kỷ ('17th'), câu (12) có thể ghi chữ 'thirty' hoặc số '30' — nghe kỹ để không nhầm 'thirteen' (13) và 'thirty' (30)."
      ],
      worksheet: {
        kind: "mcq-cloze",
        mcqTitle: "Questions 1–3 — Listen to the talk and choose the right answers.",
        mcqs: [
          {
            id: "1",
            num: "1",
            question: "Where are most of London's big department stores?",
            options: [
              { key: "A", text: "In Trafalgar Square" },
              { key: "B", text: "In Oxford Street and Bond Street" },
              { key: "C", text: "In Oxford Street and Regent Street" },
              { key: "D", text: "In Soho and Bond Street" }
            ]
          },
          {
            id: "2",
            num: "2",
            question: "Where is Nelson's statue?",
            options: [
              { key: "A", text: "In the middle of Leicester Square" },
              { key: "B", text: "In the middle of Trafalgar Square" },
              { key: "C", text: "Behind the National Gallery" },
              { key: "D", text: "In the centre of Soho" }
            ]
          },
          {
            id: "3",
            num: "3",
            question: "Which country sends a huge Christmas tree to Britain every year?",
            options: [
              { key: "A", text: "Sweden" },
              { key: "B", text: "Denmark" },
              { key: "C", text: "Germany" },
              { key: "D", text: "Norway" }
            ]
          }
        ],
        clozeTitle: "Questions 4–12 — Fill in the notes below.",
        blocks: [
          {
            type: "paragraph",
            html:
              "Piccadilly Circus is the centre of {{4}} in the West End. It is usually at the top of everyone's list of things to see in London, because it is so {{5}}. It is actually quite small and most people are rather {{6}} when they see it for the first time because they thought it would be much {{7}}. To the north of Piccadilly Circus is {{8}}, which has been the foreign quarter of London since the {{9}} century. Now it has restaurants offering food from a variety of different {{10}}, especially Chinese and Italian ones. London is famous for its live {{11}}, and there are over {{12}} theatres within a square mile. If you want to know what is on in London, the best place to look is in a newspaper."
          }
        ]
      },
      questions: [
        { id: "1", label: "Câu 1", answerDisplay: "C (In Oxford Street and Regent Street)", accepted: ["c"], explanation: "Bài nói: '...the main shopping areas of Oxford Street and Regent Street. Most of London's big department stores are in these streets...'" },
        { id: "2", label: "Câu 2", answerDisplay: "B (In the middle of Trafalgar Square)", accepted: ["b"], explanation: "Bài nói: 'Admiral Lord Nelson's statue stands on top of a column in the middle of Trafalgar Square.'" },
        { id: "3", label: "Câu 3", answerDisplay: "D (Norway)", accepted: ["d"], explanation: "Bài nói: '...a huge Christmas tree which is sent to Britain from Norway every year.'" },
        { id: "4", label: "Câu 4", answerDisplay: "night life", accepted: ["night life", "nightlife"], explanation: "Bài nói: 'Piccadilly Circus is the centre of night life in the West End.'" },
        { id: "5", label: "Câu 5", answerDisplay: "well known", accepted: ["well known", "well-known"], explanation: "Bài nói: '...because it is so well known.'" },
        { id: "6", label: "Câu 6", answerDisplay: "disappointed", accepted: ["disappointed"], explanation: "Bài nói: '...most people are rather disappointed when they see it for the first time...'" },
        { id: "7", label: "Câu 7", answerDisplay: "bigger", accepted: ["bigger"], explanation: "Bài nói: '...because they had imagined it would be much bigger.'" },
        { id: "8", label: "Câu 8", answerDisplay: "Soho", accepted: ["soho"], explanation: "Bài nói: 'To the north of Piccadilly Circus is Soho...'" },
        { id: "9", label: "Câu 9", answerDisplay: "17th", accepted: ["17th", "seventeenth"], explanation: "Bài nói: '...since the 17th century.'" },
        { id: "10", label: "Câu 10", answerDisplay: "countries", accepted: ["countries"], explanation: "Bài nói: '...offering food from a variety of different countries...'" },
        { id: "11", label: "Câu 11", answerDisplay: "theatres", accepted: ["theatres", "theaters"], explanation: "Bài nói: 'London is famous for its live theatres...'" },
        { id: "12", label: "Câu 12", answerDisplay: "thirty / 30", accepted: ["thirty", "30"], explanation: "Bài nói: '...and there are over thirty theatres within a square mile.'" }
      ],
      tapescript: [
        {
          speaker: "Speaker",
          en: "Here are some interesting places to visit. First the West End. The West End is the name given to the area of central London. It includes Trafalgar Square, the main shopping areas of Oxford Street and Regent Street. Most of London's big department stores are in these streets and the entertainment centres are in Soho, Piccadilly Circus and Leicester Square.",
          vi: "Sau đây là một số địa điểm thú vị để tham quan. Trước tiên là khu West End. West End là tên gọi của khu vực trung tâm London. Nơi đây bao gồm Quảng trường Trafalgar, các khu mua sắm chính trên đường Oxford và đường Regent. Hầu hết các trung tâm thương mại lớn của London nằm trên hai con đường này, còn các trung tâm giải trí nằm ở Soho, Piccadilly Circus và Quảng trường Leicester.",
          evidence: ["Oxford Street and Regent Street"]
        },
        {
          speaker: "Speaker",
          en: "Trafalgar Square was built early in the last century to commemorate the Battle of Trafalgar. Admiral Lord Nelson's statue stands on top of a column in the middle of Trafalgar Square. At Christmas time, carol singers gather round a huge Christmas tree which is sent to Britain from Norway every year. Behind Nelson's column is the National Gallery. Piccadilly Circus is the centre of night life in the West End. It is usually at the top of everyone's list of things to see in London, because it is so well known. It is actually quite small and most people are rather disappointed when they see it for the first time because they had imagined it would be much bigger. To the north of Piccadilly Circus is Soho, which has been the foreign quarter of London since the 17th century. Now it has restaurants offering food from a variety of different countries, especially Chinese and Italian ones. London is famous for its live theatres, and there are over thirty theatres within a square mile. If you want to know what is on in London, the best place to look is in a newspaper.",
          vi: "Quảng trường Trafalgar được xây dựng vào đầu thế kỷ trước để tưởng niệm Trận Trafalgar. Tượng Đô đốc Nelson đứng trên đỉnh một cột đá ở giữa Quảng trường Trafalgar. Vào dịp Giáng sinh, các ca đoàn hát thánh ca quây quần quanh một cây thông Noel khổng lồ được gửi tặng nước Anh từ Na Uy mỗi năm. Phía sau cột tượng Nelson là Phòng trưng bày Quốc gia. Piccadilly Circus là trung tâm nhịp sống về đêm ở West End. Nó thường đứng đầu danh sách những nơi cần ghé thăm ở London vì quá nổi tiếng. Thực ra nơi đây khá nhỏ và hầu hết mọi người khá thất vọng khi lần đầu nhìn thấy vì họ từng tưởng tượng nó rộng lớn hơn nhiều. Phía bắc Piccadilly Circus là Soho, khu phố người nước ngoài của London từ thế kỷ 17. Ngày nay nơi đây có các nhà hàng phục vụ ẩm thực từ nhiều quốc gia khác nhau, đặc biệt là món Hoa và món Ý. London nổi tiếng với các nhà hát kịch trực tiếp, với hơn 30 nhà hát trong phạm vi một dặm vuông. Nếu bạn muốn biết có chương trình gì đang diễn ra ở London, nơi tốt nhất để tìm xem là trên báo.",
          evidence: ["in the middle of Trafalgar Square", "Norway", "night life", "well known", "disappointed", "bigger", "Soho", "17th", "countries", "theatres", "thirty"]
        }
      ],
      scriptVocabTitle: "Từ vựng gạch chân trong Script",
      scriptVocab: [
        { word: "commemorate", match: "commemorate", pos: "v", vi: "tưởng niệm, kỷ niệm" },
        { word: "Gallery", match: "Gallery", pos: "n", vi: "phòng trưng bày / bảo tàng nghệ thuật" }
      ]
    },

    // ========================================================================
    // EXERCISE 13 — Trip to Belfast (65.MP3)
    // ========================================================================
    {
      id: "ex-13",
      num: "13",
      sectionGroup: "section2",
      title: "Trip to Belfast",
      titleVi: "Chuyến du lịch 2 ngày tại Belfast & tàu Titanic",
      ieltsPart: "IELTS Part 2",
      questionType: "Note & Table Completion (Lịch trình)",
      shortType: "Note & Table Completion",
      trackFile: "65.mp3",
      trackLabel: "65.MP3",
      duration: "02:28",
      icon: "fa-ship",
      themeBadge: "BELFAST & TITANIC",
      themeColor: "#E0F2FE",
      instruction: "Listen to the talk and fill in the missing information in the notes and trip itinerary table below.",
      wordLimit: "",
      wordBank: [
        { word: "youngest", ipa: "/ˈjʌŋ.ɡɪst/", vi: "trẻ nhất" },
        { word: "population", ipa: "/ˌpɒp.jəˈleɪ.ʃən/", vi: "dân số" },
        { word: "village", ipa: "/ˈvɪl.ɪdʒ/", vi: "ngôi làng" },
        { word: "engineering", ipa: "/ˌen.dʒɪˈnɪə.rɪŋ/", vi: "ngành kỹ thuật/cơ khí" },
        { word: "shipbuilding", ipa: "/ˈʃɪpˌbɪl.dɪŋ/", vi: "ngành đóng tàu" },
        { word: "fatal", ipa: "/ˈfeɪ.təl/", vi: "định mệnh, thảm khốc" },
        { word: "art gallery", ipa: "/ˈɡæl.ər.i/", vi: "phòng triển lãm tranh" },
        { word: "concert", ipa: "/ˈkɒn.sət/", vi: "buổi hòa nhạc" },
        { word: "rare plants", ipa: "/reər plɑːnts/", vi: "thực vật quý hiếm" }
      ],
      tips: [
        "Đọc bảng lịch trình theo CỘT (First day: 7 → 8 → 9, sau đó mới sang Second day: 10 → 11 → 12 → 13) vì hướng dẫn viên thuyết minh trọn vẹn 'This morning / This afternoon / This evening' rồi mới chuyển sang 'Tomorrow morning...'.",
        "Chú ý số lượng chữ số 0 ở câu (2) '400,000' và câu (10) '9,000'.",
        "Chính tả dễ nhầm: 'engineering', 'shipbuilding' (viết liền), 'fatal'."
      ],
      worksheet: {
        kind: "notes-and-table",
        notesBlocks: [
          {
            type: "paragraph",
            html:
              "Belfast is one of the {{1}} capital cities in the world and it has grown very fast. Today the city has a population of {{2}}, nearly a third of the entire population of Northern Ireland, but in the 17th century it was only a {{3}}. Then, during the 19th century, the development of industries like linen, rope-making, {{4}}, tobacco and sea trade doubled the town's size every ten years. The city is well known for {{5}}. It was here that the \"Titanic\" was built and set out on her {{6}} maiden voyage."
          }
        ],
        tableTitle: "Plan for the trip to Belfast",
        headers: ["Time", "First day – what to do", "Second day – what to do"],
        rows: [
          [
            "<strong>Morning</strong>",
            "Visit an {{7}}, Belfast Cathedral and {{8}}",
            "Visit Ulster Museum and see {{10}} years of human history in Ireland and the 16th century Spanish {{11}} treasure"
          ],
          [
            "<strong>Afternoon</strong>",
            "Visit the zoo",
            "Visit the Botanic Gardens and see {{12}} and visit the Palm House"
          ],
          [
            "<strong>Evening</strong>",
            "Go to a {{9}} at Ulster Hall",
            "Free time, you can go to some {{13}} pubs"
          ]
        ]
      },
      questions: [
        { id: "1", label: "Câu 1", answerDisplay: "youngest", accepted: ["youngest"], explanation: "Bài nói: 'Belfast is one of the youngest capital cities in the world...'" },
        { id: "2", label: "Câu 2", answerDisplay: "400,000", accepted: ["400,000", "400000", "400 000", "four hundred thousand"], explanation: "Bài nói: 'Today the city has a population of 400,000...'" },
        { id: "3", label: "Câu 3", answerDisplay: "village", accepted: ["village"], explanation: "Bài nói: '...in the 17th century it was only a village.'" },
        { id: "4", label: "Câu 4", answerDisplay: "engineering", accepted: ["engineering"], explanation: "Bài nói: '...linen, rope-making, engineering, tobacco and sea trade...'" },
        { id: "5", label: "Câu 5", answerDisplay: "shipbuilding", accepted: ["shipbuilding", "ship building", "ship-building"], explanation: "Bài nói: 'The city is well known for shipbuilding.'" },
        { id: "6", label: "Câu 6", answerDisplay: "fatal", accepted: ["fatal"], explanation: "Bài nói: '...set out on her fatal maiden voyage.'" },
        { id: "7", label: "Câu 7", answerDisplay: "art gallery", accepted: ["art gallery"], explanation: "Bài nói: 'This morning you will visit an art gallery, Belfast Cathedral and City Hall.'" },
        { id: "8", label: "Câu 8", answerDisplay: "City Hall", accepted: ["city hall"], explanation: "Bài nói: '...Belfast Cathedral and City Hall.'" },
        { id: "9", label: "Câu 9", answerDisplay: "concert", accepted: ["concert"], explanation: "Bài nói: '...this evening, you will go to a concert at Ulster Hall.'" },
        { id: "10", label: "Câu 10", answerDisplay: "9,000", accepted: ["9,000", "9000", "nine thousand"], explanation: "Bài nói: '...see 9,000 years of human history in Ireland...'" },
        { id: "11", label: "Câu 11", answerDisplay: "gold / warship", accepted: ["gold", "warship", "gold / warship", "warship gold", "gold warship"], explanation: "Bài nói: '...the gold treasure of the 16th century Spanish warship...'" },
        { id: "12", label: "Câu 12", answerDisplay: "rare plants", accepted: ["rare plants"], explanation: "Bài nói: '...you will walk among rare plants.'" },
        { id: "13", label: "Câu 13", answerDisplay: "local", accepted: ["local"], explanation: "Bài nói: '...so you can go to some local pubs.'" }
      ],
      tapescript: [
        {
          speaker: "Tour Guide (Introduction)",
          en: "Good morning, everyone. Welcome to Belfast. Now I will give you some information about Belfast. Belfast is one of the youngest capital cities in the world and it has grown incredibly fast. Today the city has a population of 400,000, nearly a third of the entire population of Northern Ireland, but in the 17th century it was only a village. Then, during the 19th century, the development of industries like linen, rope-making, engineering, tobacco and sea trade doubled the town's size every ten years. The city is well known for shipbuilding. It was here that the \"Titanic\" was built and set out on her fatal maiden voyage.",
          vi: "Chào buổi sáng mọi người. Chào mừng đến với Belfast. Bây giờ tôi sẽ cung cấp cho quý vị một số thông tin về Belfast. Belfast là một trong những thủ đô trẻ nhất thế giới và phát triển nhanh đến kinh ngạc. Ngày nay thành phố có dân số 400.000 người, gần một phần ba tổng dân số Bắc Ireland, nhưng vào thế kỷ 17 nó chỉ là một ngôi làng nhỏ. Sau đó trong thế kỷ 19, sự phát triển của các ngành công nghiệp như vải lanh, làm dây thừng, cơ khí kỹ thuật, thuốc lá và thương mại hàng hải đã giúp quy mô thị trấn tăng gấp đôi mỗi mười năm. Thành phố nổi tiếng về ngành đóng tàu. Chính tại đây con tàu \"Titanic\" đã được đóng và khởi hành chuyến đi biển đầu tiên định mệnh của mình.",
          evidence: ["youngest", "400,000", "village", "engineering", "shipbuilding", "fatal"]
        },
        {
          speaker: "Tour Guide (Two-Day Itinerary)",
          en: "Here is your brief tour around Belfast. This morning you will visit an art gallery, Belfast Cathedral and City Hall. This afternoon, you will visit the zoo and this evening, you will go to a concert at Ulster Hall. Tomorrow morning, you will visit Ulster Museum and see 9,000 years of human history in Ireland and the gold treasure of the 16th century Spanish warship which was recovered off the coast of Antrim in 1968. In the afternoon, you will go to the Botanic Gardens and you will walk among rare plants. Some of the tropical plants are 100 years old. And then you will visit the Palm House. It was built in 1850. You will have a free evening so you can go to some local pubs. It's possible for you to find a really friendly atmosphere and enjoy some Irish folk music there. Next morning at 10, you will leave the hotel and fly back to London. I hope you will enjoy the two-day tour. Thanks.",
          vi: "Đây là lịch trình tóm tắt tham quan Belfast của quý vị. Sáng nay quý vị sẽ thăm phòng triển lãm tranh, Nhà thờ lớn Belfast và Tòa thị chính. Chiều nay quý vị thăm sở thú và tối nay sẽ dự buổi hòa nhạc tại Ulster Hall. Sáng mai quý vị thăm Bảo tàng Ulster để chiêm ngưỡng 9.000 năm lịch sử loài người tại Ireland cùng kho báu vàng của chiến hạm Tây Ban Nha thế kỷ 16 được trục vớt ngoài khơi Antrim năm 1968. Buổi chiều quý vị đến Vườn Bách thảo dạo bước giữa các loài thực vật quý hiếm. Một số cây nhiệt đới đã 100 tuổi. Sau đó quý vị sẽ thăm nhà kính Palm House xây dựng năm 1850. Quý vị có buổi tối tự do để ghé các quán rượu địa phương, tận hưởng bầu không khí thân thiện và nghe nhạc dân gian Ireland. Sáng hôm sau lúc 10 giờ, quý vị sẽ rời khách sạn và bay về London. Chúc quý vị tận hưởng chuyến du lịch hai ngày. Xin cảm ơn.",
          evidence: ["art gallery", "City Hall", "concert", "9,000", "gold treasure", "warship", "rare plants", "local"]
        }
      ],
      scriptVocabTitle: "Từ vựng gạch chân trong Script",
      scriptVocab: [
        { word: "incredibly", match: "incredibly", pos: "adv", vi: "đáng kinh ngạc" },
        { word: "linen", match: "linen", pos: "n", vi: "vải lanh" },
        { word: "rope-making", match: "rope-making", pos: "n", vi: "nghề làm dây thừng" },
        { word: "fatal", match: "fatal", pos: "adj", vi: "định mệnh, thảm khốc" },
        { word: "maiden voyage", match: "maiden voyage", pos: "n.p", vi: "chuyến đi biển đầu" },
        { word: "Cathedral", match: "Cathedral", pos: "n", vi: "nhà thờ lớn" },
        { word: "rare plants", match: "rare plants", pos: "n.p", vi: "thực vật quý hiếm" },
        { word: "tropical", match: "tropical", pos: "adj", vi: "nhiệt đới" },
        { word: "atmosphere", match: "atmosphere", pos: "n", vi: "bầu không khí" }
      ]
    },

    // ========================================================================
    // EXERCISE 14 — TV and radio (66.MP3)
    // ========================================================================
    {
      id: "ex-14",
      num: "14",
      sectionGroup: "section2",
      title: "TV and radio",
      titleVi: "Hệ thống phát thanh & truyền hình tại Anh (BBC & IBA)",
      ieltsPart: "IELTS Part 2/4",
      questionType: "Note, Table & Sentence Completion",
      shortType: "Note, Table & Sentences",
      trackFile: "66.mp3",
      trackLabel: "66.MP3",
      duration: "02:17",
      icon: "fa-tv",
      themeBadge: "UK TV & RADIO · BBC",
      themeColor: "#FEF9C3",
      instruction: "Listen to the talk and complete the notes, table, and sentences below.",
      wordLimit: "",
      wordBank: [
        { word: "broadcasting", ipa: "/ˈbrɔːdˌkɑː.stɪŋ/", vi: "phát thanh truyền hình" },
        { word: "light music", ipa: "/laɪt/", vi: "nhạc nhẹ" },
        { word: "classical music", ipa: "/ˈklæs.ɪ.kəl/", vi: "nhạc cổ điển" },
        { word: "drama", ipa: "/ˈdrɑː.mə/", vi: "kịch truyền thanh" },
        { word: "regional", ipa: "/ˈriː.dʒən.əl/", vi: "thuộc vùng/địa phương" },
        { word: "advertisements", ipa: "/ədˈvɜː.tɪs.mənts/", vi: "quảng cáo" },
        { word: "specialised", ipa: "/ˈspeʃ.əl.aɪzd/", vi: "chuyên sâu, chuyên biệt" },
        { word: "are worried about", ipa: "/ˈwʌr.id/", vi: "lo ngại về" }
      ],
      tips: [
        "Bài gồm 3 phần liền mạch theo đúng trật tự bài nói: Giới thiệu BBC & IBA (1–3) → Bảng 4 kênh Radio (4–7) → Các câu về Truyền hình BBC/IBA/Channel 4 (8–12).",
        "Chú ý các câu có 2 ô trống: câu (7) 'news programmes' + 'drama', câu (8) 'two' + 'BBC 2', câu (12) '(very) high' + 'are worried about'.",
        "Chính tả Anh-Anh ('specialised', 'programmes') và Anh-Mỹ ('specialized', 'programs') đều được chấp nhận."
      ],
      worksheet: {
        kind: "tv-radio-mixed",
        introBlocks: [
          { type: "paragraph", html: "There are two main broadcasting companies in Britain." },
          { type: "paragraph", html: "One is {{1}}, the other is {{2}}." },
          { type: "paragraph", html: "National radio is controlled by the {{3}}. There are four stations." }
        ],
        tableHeaders: ["Station", "Programmes"],
        tableRows: [
          ["<strong>Radio 1</strong>", "{{4}} music, news and magazine-style programmes"],
          ["<strong>Radio 2</strong>", "{{5}} music and reports on sport"],
          ["<strong>Radio 3</strong>", "{{6}}"],
          ["<strong>Radio 4</strong>", "{{7a}}, {{7b}} and general interests"]
        ],
        sentences: [
          { num: "8", html: "The BBC has {{8a}} TV channels. {{8b}} has more serious programmes and news features." },
          { num: "9", html: "The IBA is responsible for looking after {{9}} independent TV companies." },
          { num: "10", html: "There is a break for advertisements about every {{10}} minutes." },
          { num: "11", html: "Channel 4 is an independent channel. It has more {{11}} programmes than the main channels." },
          { num: "12", html: "Many people think the programmes on British TV have a {{12a}} standard, but some people {{12b}} the amount of violence on TV." }
        ]
      },
      questions: [
        { id: "1", label: "Câu 1", answerDisplay: "(the) BBC", accepted: ["bbc", "the bbc", "british broadcasting corporation", "the british broadcasting corporation"], explanation: "Bài nói: '...British Broadcasting Corporation known as the BBC...'" },
        { id: "2", label: "Câu 2", answerDisplay: "(the) IBA", accepted: ["iba", "the iba", "independent broadcasting authority", "the independent broadcasting authority"], explanation: "Bài nói: '...and the Independent Broadcasting Authority known as IBA.'" },
        { id: "3", label: "Câu 3", answerDisplay: "BBC", accepted: ["bbc", "british broadcasting corporation"], explanation: "Bài nói: 'National radio is controlled by the BBC...'" },
        { id: "4", label: "Câu 4", answerDisplay: "pop", accepted: ["pop"], explanation: "Bài nói: 'Radio 1 is a pop music station...'" },
        { id: "5", label: "Câu 5", answerDisplay: "light", accepted: ["light"], explanation: "Bài nói: 'Radio 2 plays light music and reports on sport.'" },
        { id: "6", label: "Câu 6", answerDisplay: "classical music", accepted: ["classical music", "classical"], explanation: "Bài nói: 'Radio 3 plays classical music...'" },
        { id: "7a", label: "Câu 7 (trống 1)", answerDisplay: "news programmes", accepted: ["news programmes", "news programs", "news"], explanation: "Bài nói: '...Radio 4 has news programmes, drama and general interest programmes.'" },
        { id: "7b", label: "Câu 7 (trống 2)", answerDisplay: "drama", accepted: ["drama"], explanation: "Bài nói: '...news programmes, drama and general interest programmes.'" },
        { id: "8a", label: "Câu 8 (trống 1)", answerDisplay: "two", accepted: ["two", "2"], explanation: "Bài nói: 'The BBC has two TV channels...'" },
        { id: "8b", label: "Câu 8 (trống 2)", answerDisplay: "BBC 2", accepted: ["bbc 2", "bbc2", "bbc two"], explanation: "Bài nói: '...BBC 2 has more serious programmes and news features.'" },
        { id: "9", label: "Câu 9", answerDisplay: "regional", accepted: ["regional"], explanation: "Bài nói: '...looking after the regional independent TV companies...'" },
        { id: "10", label: "Câu 10", answerDisplay: "15–20", accepted: ["15-20", "15–20", "15 to 20", "15 - 20", "fifteen to twenty"], explanation: "Bài nói: '...for advertisements about every 15–20 minutes.'" },
        { id: "11", label: "Câu 11", answerDisplay: "specialised", accepted: ["specialised", "specialized"], explanation: "Bài nói: '...it has more specialised programmes than the main channels.'" },
        { id: "12a", label: "Câu 12 (trống 1)", answerDisplay: "(very) high", accepted: ["very high", "high"], explanation: "Bài nói: '...British television are of a very high standard.'" },
        { id: "12b", label: "Câu 12 (trống 2)", answerDisplay: "are worried about", accepted: ["are worried about", "are becoming worried about", "worry about", "worried about"], explanation: "Bài nói: 'Some people, however, are becoming worried about the amount of violence on TV...'" }
      ],
      tapescript: [
        {
          speaker: "Speaker (Radio)",
          en: "Watching television is one of the great British pastimes. Broadcasting in the United Kingdom is controlled by the British Broadcasting Corporation known as the BBC and the Independent Broadcasting Authority known as IBA. The BBC receives its income from the government; the IBA earns money from private companies' advertising. National radio is controlled by the BBC, and listeners can choose between four stations. Radio 1 is a pop music station with news and magazine-style programmes. Radio 2 plays light music and reports on sport. Radio 3 plays classical music and Radio 4 has news programmes, drama and general interest programmes. There are many local stations, some private and some run by the BBC. Their programmes consist mainly of music and local news.",
          vi: "Xem truyền hình là một trong những thú tiêu khiển lớn của người Anh. Ngành phát thanh truyền hình ở Vương quốc Anh do Tập đoàn Phát thanh Truyền hình Anh (gọi tắt là BBC) và Cơ quan Phát thanh Truyền hình Độc lập (gọi tắt là IBA) kiểm soát. BBC nhận ngân sách từ chính phủ; còn IBA kiếm doanh thu từ quảng cáo của các công ty tư nhân. Phát thanh quốc gia do BBC quản lý, thính giả có thể chọn giữa bốn đài. Radio 1 là đài nhạc pop kèm tin tức và chương trình kiểu tạp chí. Radio 2 phát nhạc nhẹ và tường thuật thể thao. Radio 3 phát nhạc cổ điển còn Radio 4 có chương trình tin tức, kịch truyền thanh và các chương trình tổng hợp. Ngoài ra còn nhiều đài địa phương, gồm đài tư nhân và đài do BBC vận hành, chủ yếu phát nhạc và tin địa phương.",
          evidence: ["the BBC", "IBA", "pop", "light", "classical music", "news programmes", "drama"]
        },
        {
          speaker: "Speaker (Television)",
          en: "The BBC has two TV channels, BBC 2 has more serious programmes and news features. The IBA is responsible for looking after the regional independent TV companies who broadcast their own programmes and those they have bought from other regions. There is a break in programmes for advertisements about every 15–20 minutes. The most recent independent channel is Channel 4 and it has more specialised programmes than the main channels. In general, people think the programmes offered on British television are of a very high standard. Some people, however, are becoming worried about the amount of violence on TV and the effect this may have on young people.",
          vi: "BBC có hai kênh truyền hình, trong đó BBC 2 có các chương trình chuyên sâu và chuyên mục tin tức nghiêm túc hơn. IBA chịu trách nhiệm quản lý các công ty truyền hình độc lập theo vùng — những đơn vị phát sóng chương trình tự sản xuất và chương trình mua lại từ vùng khác. Khoảng 15–20 phút lại có một đợt nghỉ phát quảng cáo. Kênh độc lập mới nhất là Channel 4 với nhiều chương trình chuyên biệt hơn các kênh chính. Nhìn chung, mọi người đánh giá các chương trình truyền hình Anh có tiêu chuẩn rất cao. Tuy nhiên, một số người đang ngày càng lo ngại về mức độ bạo lực trên TV và tác động của nó lên giới trẻ.",
          evidence: ["two", "BBC 2", "regional", "15–20", "specialised", "very high", "becoming worried about"]
        }
      ],
      scriptVocabTitle: "Từ vựng gạch chân trong Script",
      scriptVocab: [
        { word: "Broadcasting", match: "Broadcasting", pos: "n", vi: "phát thanh & truyền hình" },
        { word: "advertisements", match: "advertisements", pos: "n", vi: "các mục quảng cáo" },
        { word: "violence", match: "violence", pos: "n", vi: "sự bạo lực" }
      ]
    },

    // ========================================================================
    // EXERCISE 15 — Sports (67.MP3)
    // ========================================================================
    {
      id: "ex-15",
      num: "15",
      sectionGroup: "section2",
      title: "Sports",
      titleVi: "Thể thao & thành ngữ thể thao trong đời sống Anh",
      ieltsPart: "IELTS Part 2/4",
      questionType: "Table Completion & True/False",
      shortType: "Table & True/False",
      trackFile: "67.mp3",
      trackLabel: "67.MP3",
      duration: "02:41",
      icon: "fa-futbol",
      themeBadge: "BRITISH SPORTS",
      themeColor: "#DCFCE7",
      instruction: "Questions 1–10: Fill in the missing information in the table. Questions 11–16: Select T (True) or F (False) for each statement.",
      wordLimit: "",
      wordBank: [
        { word: "sailing", ipa: "/ˈseɪ.lɪŋ/", vi: "đua thuyền buồm" },
        { word: "rowing", ipa: "/ˈrəʊ.ɪŋ/", vi: "chèo thuyền" },
        { word: "rock climbing", ipa: "/rɒk ˈklaɪ.mɪŋ/", vi: "leo núi đá" },
        { word: "horse riding", ipa: "/hɔːs ˈraɪ.dɪŋ/", vi: "cưỡi ngựa" },
        { word: "cricket", ipa: "/ˈkrɪk.ɪt/", vi: "môn bóng gậy" },
        { word: "ice skating", ipa: "/aɪs ˈskeɪ.tɪŋ/", vi: "trượt băng" },
        { word: "spectator sports", ipa: "/spekˈteɪ.tər/", vi: "thể thao đông khán giả" }
      ],
      tips: [
        "Ở phần True/False (Q11–16), hãy cảnh giác với các từ mang tính tuyệt đối ('All colleges' ở câu 11 thực tế là 'Many colleges' → F) và bẫy đánh tráo cặp khái niệm ở câu 14 & 15 ('to play the game' vs 'That's not cricket')!",
        "Ở bảng Q1–10, đọc cột 'Where' trước để dự đoán nhóm môn thể thao: nước (1–2), thiên nhiên/phong cảnh (3–5), ngoài trời (6–8), trong nhà (9–10)."
      ],
      worksheet: {
        kind: "sports-mixed",
        tableTitle: "Questions 1–10 — Listen to the talk and fill in the missing information in the right places.",
        headers: ["Sports", "Where"],
        rows: [
          ["Water sports, {{1}} and {{2}}", "On the lakes, rivers and coastlines"],
          ["{{3}}, {{4}} and {{5}}", "In the landscape"],
          ["Football, {{6}}, {{7}}", "{{8}}"],
          ["Squash, {{9}}, {{10}}", "Indoors"]
        ],
        tfTitle: "Questions 11–16 — Indicate whether the following statements are True (T) or False (F).",
        statements: [
          { id: "11", num: "11", text: "All colleges have their own impressive sports facilities." },
          { id: "12", num: "12", text: "The most popular outdoor sports are football and tennis." },
          { id: "13", num: "13", text: "Motor racing is one of the popular sports in Britain." },
          { id: "14", num: "14", text: "\"To play the game\" means \"That's not fair\"." },
          { id: "15", num: "15", text: "\"That's not cricket\" means \"to be fair\"." },
          { id: "16", num: "16", text: "The most popular sport in Britain is football." }
        ]
      },
      questions: [
        { id: "1", label: "Câu 1", answerDisplay: "sailing", accepted: ["sailing"], explanation: "Bài nói: 'Sailing and rowing are practised on the lakes, rivers and coastlines.'" },
        { id: "2", label: "Câu 2", answerDisplay: "rowing", accepted: ["rowing"], explanation: "Bài nói: 'Sailing and rowing are practised on the lakes...'" },
        { id: "3", label: "Câu 3", answerDisplay: "Walking", accepted: ["walking"], explanation: "Bài nói: 'Walking, rock climbing and horse riding are all good ways to explore the landscape.'" },
        { id: "4", label: "Câu 4", answerDisplay: "rock climbing", accepted: ["rock climbing"], explanation: "Bài nói: 'Walking, rock climbing and horse riding...'" },
        { id: "5", label: "Câu 5", answerDisplay: "horse riding", accepted: ["horse riding", "horse-riding"], explanation: "Bài nói: '...rock climbing and horse riding...'" },
        { id: "6", label: "Câu 6", answerDisplay: "cricket", accepted: ["cricket"], explanation: "Bài nói: '...outdoor pitches for football, cricket and other team games.'" },
        { id: "7", label: "Câu 7", answerDisplay: "tennis", accepted: ["tennis"], explanation: "Bài nói: 'Tennis is played on outdoor courts in summer...'" },
        { id: "8", label: "Câu 8", answerDisplay: "Outdoors / outdoor courts", accepted: ["outdoors", "outdoor", "outdoor courts", "outdoor pitches", "on outdoor pitches", "on outdoor courts", "outdoor pitches and courts"], explanation: "Football, cricket và tennis đều chơi ngoài trời (outdoor pitches / outdoor courts)." },
        { id: "9", label: "Câu 9", answerDisplay: "swimming", accepted: ["swimming", "indoor swimming", "swimming pools"], explanation: "Bài nói: '...will also have indoor swimming pools...'" },
        { id: "10", label: "Câu 10", answerDisplay: "ice skating", accepted: ["ice skating", "ice-skating", "skating", "ice skating rinks"], explanation: "Bài nói: '...and some have ice skating rinks.'" },
        { id: "11", label: "Câu 11 (T/F)", answerDisplay: "F (False)", accepted: ["f", "false"], explanation: "SAI (F) — Bài nói là 'Many colleges' (nhiều trường), KHÔNG phải 'All colleges' (tất cả)." },
        { id: "12", label: "Câu 12 (T/F)", answerDisplay: "F (False)", accepted: ["f", "false"], explanation: "SAI (F) — Hai môn thể thao ngoài trời đông khán giả nhất là 'football and horse racing', không phải tennis." },
        { id: "13", label: "Câu 13 (T/F)", answerDisplay: "T (True)", accepted: ["t", "true"], explanation: "ĐÚNG (T) — Bài nói: 'All forms of motor racing are also popular.'" },
        { id: "14", label: "Câu 14 (T/F)", answerDisplay: "F (False)", accepted: ["f", "false"], explanation: "SAI (F) — 'to play the game' nghĩa là 'to be fair' (chơi công bằng), bị tráo nghĩa với câu 15." },
        { id: "15", label: "Câu 15 (T/F)", answerDisplay: "F (False)", accepted: ["f", "false"], explanation: "SAI (F) — 'That's not cricket' nghĩa là 'That's not fair' (không công bằng)." },
        { id: "16", label: "Câu 16 (T/F)", answerDisplay: "T (True)", accepted: ["t", "true"], explanation: "ĐÚNG (T) — Bài nói: 'The most popular sport in Britain as a whole is football.'" }
      ],
      tapescript: [
        {
          speaker: "Speaker (Part 1 — Types of Sports)",
          en: "Sports are very important in British life. It's possible to practise all kinds of sports in Britain. You can see water sports. Sailing and rowing are practised on the lakes, rivers and coastlines. These kinds of sports are more popular in summer. Walking, rock climbing and horse riding are all good ways to explore the landscape. Nearer your home you will certainly find outdoor pitches for football, cricket and other team games. Tennis is played on outdoor courts in summer while squash has become a popular game in recent years, as it can be played year-round on indoor courts. Most colleges and towns will also have indoor swimming pools and some have ice skating rinks.",
          vi: "Thể thao đóng vai trò rất quan trọng trong đời sống người Anh. Bạn có thể tập luyện đủ mọi môn thể thao tại Anh. Có các môn thể thao dưới nước như đua thuyền buồm và chèo thuyền trên hồ, sông và đường bờ biển — phổ biến hơn vào mùa hè. Đi bộ đường dài, leo núi đá và cưỡi ngựa đều là những cách tuyệt vời để khám phá thiên nhiên. Gần nhà hơn, bạn chắc chắn sẽ thấy sân ngoài trời cho bóng đá, cricket và các môn đồng đội khác. Quần vợt được chơi trên sân ngoài trời vào mùa hè trong khi bóng quần (squash) trở nên phổ biến gần đây vì có thể chơi quanh năm trên sân trong nhà. Hầu hết các trường đại học và thị trấn đều có bể bơi trong nhà và một số nơi còn có sân trượt băng.",
          evidence: ["Sailing", "rowing", "Walking", "rock climbing", "horse riding", "outdoor pitches", "cricket", "Tennis", "outdoor courts", "indoor swimming pools", "ice skating"]
        },
        {
          speaker: "Speaker (Part 2 — Spectator Sports & Idioms)",
          en: "Many colleges have their own extremely impressive sports facilities and this is the best place to find what is available. For example, most universities have a day at the start of the year when all the clubs and societies advertise their activities and you can go round and choose which you would like to join. The most popular outdoor spectator sports are football and horse racing. Most large towns have their own football team and ground while race courses are found in the country and outside most major cities. All forms of motor racing are also popular. Sport plays such a large part in British life that many idioms in the English language have come from the world of sport, for example: \"to play the game\" means \"to be fair\", and \"That's not cricket\" means \"That's not fair\". The most popular sport in Britain as a whole is football. A lot of people support their local clubs at matches on Saturday afternoons or watch the matches live on television.",
          vi: "Nhiều trường cao đẳng/đại học sở hữu cơ sở vật chất thể thao vô cùng ấn tượng và đây là nơi tốt nhất để tìm hiểu các môn hiện có. Ví dụ, phần lớn các trường đại học có một ngày hội đầu năm khi mọi câu lạc bộ và hội nhóm giới thiệu hoạt động để sinh viên đi quanh và chọn tham gia. Hai môn thể thao ngoài trời thu hút khán giả nhất là bóng đá và đua ngựa. Hầu hết các thị trấn lớn đều có đội bóng và sân vận động riêng, trong khi các trường đua ngựa nằm ở vùng nông thôn và ngoại ô các thành phố lớn. Mọi hình thức đua xe mô-tô/ô-tô cũng rất phổ biến. Thể thao giữ vai trò lớn đến mức nhiều thành ngữ tiếng Anh bắt nguồn từ thể thao, ví dụ: \"to play the game\" nghĩa là \"chơi công bằng\", còn \"That's not cricket\" nghĩa là \"thế không công bằng\". Môn thể thao phổ biến nhất tại Anh nói chung là bóng đá. Rất nhiều người cổ vũ câu lạc bộ địa phương vào các chiều thứ Bảy hoặc xem trực tiếp trên truyền hình.",
          evidence: ["Many colleges", "football and horse racing", "motor racing are also popular", "\"to play the game\" means \"to be fair\"", "\"That's not cricket\" means \"That's not fair\"", "most popular sport in Britain as a whole is football"]
        }
      ],
      scriptVocabTitle: "Từ vựng gạch chân trong Script",
      scriptVocab: [
        { word: "coastlines", match: "coastlines", pos: "n", vi: "đường bờ biển" },
        { word: "explore", match: "explore", pos: "v", vi: "khám phá, thám hiểm" },
        { word: "landscape", match: "landscape", pos: "n", vi: "phong cảnh, cảnh quan" },
        { word: "cricket", match: "cricket", pos: "n", vi: "môn bóng gậy (cricket)" },
        { word: "squash", match: "squash", pos: "n", vi: "môn bóng quần (sân kín)" },
        { word: "skating rinks", match: "skating rinks", pos: "n.p", vi: "sân trượt băng" },
        { word: "spectator", match: "spectator", pos: "n", vi: "khán giả xem trực tiếp" }
      ]
    }
  ];

  const byId = {};
  EXERCISES.forEach(ex => {
    byId[ex.id] = ex;
  });

  return {
    EXERCISES,
    byId
  };
})();
