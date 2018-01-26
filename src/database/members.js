/* SCHEMA
 * id: id (required)
 * name: String (required)
 * colorId: Color(id) (required)
 * altColorId: Color(id) (required)
 * birthdate: Integer
 * position: Array[Position(id)]
 */

const MEMBERS = {
    "1": {
        "id": 1,
        "name": "Taeyeon",
        "colorId": 5,
        "altColorId": 21,
        "birthdate": "19890309",
        "position": [1, 2]
      },
      "2": {
        "id": 2,
        "name": "Jessica",
        "colorId": 23,
        "altColorId": 20,
        "birthdate": "19890418",
        "position": [2]
      },
      "3": {
        "id": 3,
        "name": "Sunny",
        "colorId": 24,
        "altColorId": 27,
        "birthdate": "19890515",
        "position": [3]
      },
      "4": {
        "id": 4,
        "name": "Hyoyeon",
        "colorId": 17,
        "altColorId": 14,
        "birthdate": "19890922",
        "position": [4, 5, 8]
      },
      "5": {
        "id": 5,
        "name": "Yuri",
        "colorId": 33,
        "altColorId": 30,
        "birthdate": "19891205",
        "position": [4, 6, 9]
      },
      "6": {
        "id": 6,
        "name": "Yoona",
        "colorId": 11,
        "altColorId": 27,
        "birthdate": "19900530",
        "position": [4, 6, 10, 11, 12]
      },
      "7": {
        "id": 7,
        "name": "Tiffany",
        "colorId": 30,
        "altColorId": 13,
        "birthdate": "19890801",
        "position": [3, 10]
      },
      "8": {
        "id": 8,
        "name": "Sooyoung",
        "colorId": 20,
        "altColorId": 23,
        "birthdate": "19900210",
        "position": [4, 6, 9]
      },
      "9": {
        "id": 9,
        "name": "Seohyun",
        "colorId": 19,
        "altColorId": 22,
        "birthdate": "19910628",
        "position": [3, 13]
      },
      "10": {
        "id": 10,
        "name": "CL",
        "colorId": 3,
        "altColorId": 6,
        "birthdate": "19910226",
        "position": [1, 3, 6, 8, 12]
      },
      "11": {
        "id": 11,
        "name": "Bom",
        "colorId": 18,
        "altColorId": 15,
        "birthdate": "19840324",
        "position": [2]
      },
      "12": {
        "id": 12,
        "name": "Dara",
        "colorId": 24,
        "altColorId": 21,
        "birthdate": "19841112",
        "position": [4, 11]
      },
      "13": {
        "id": 13,
        "name": "Minzy",
        "colorId": 21,
        "altColorId": 24,
        "birthdate": "19940118",
        "position": [3, 5, 9, 13]
      },
      "14": {
        "id": 14,
        "name": "Yubin",
        "colorId": 18,
        "altColorId": 21,
        "birthdate": "19881004",
        "position": [4, 8, 12]
      },
      "15": {
        "id": 15,
        "name": "Yeeun",
        "colorId": 21,
        "altColorId": 18,
        "birthdate": "19890526",
        "position": [2]
      },
      "16": {
        "id": 16,
        "name": "Sunmi",
        "colorId": 2,
        "altColorId": 32,
        "birthdate": "19920502",
        "position": [3, 11]
      },
      "17": {
        "id": 17,
        "name": "Hyelim",
        "colorId": 32,
        "altColorId": 15,
        "birthdate": "19920901",
        "position": [4, 9, 13]
      },
      "18": {
        "id": 18,
        "name": "Sohee",
        "colorId": 24,
        "altColorId": 7,
        "birthdate": "19920627",
        "position": [4, 5, 11]
      },
      "19": {
        "id": 19,
        "name": "Sunye",
        "colorId": 5,
        "altColorId": 21,
        "birthdate": "19890812",
        "position": [1, 2, 6]
      },
      "20": {
        "id": 20,
        "name": "JeA",
        "colorId": 2,
        "altColorId": 18,
        "birthdate": "19810918",
        "position": [1, 2]
      },
      "21": {
        "id": 21,
        "name": "Miryo",
        "colorId": 15,
        "altColorId": 18,
        "birthdate": "10811102",
        "position": [4, 8]
      },
      "22": {
        "id": 22,
        "name": "Narsha",
        "colorId": 21,
        "altColorId": 18,
        "birthdate": "19811229",
        "position": [3, 6]
      },
      "23": {
        "id": 23,
        "name": "GaIn",
        "colorId": 25,
        "altColorId": 8,
        "birthdate": "19870920",
        "position": [4, 5, 11, 12, 13]
      }
};

export default MEMBERS;