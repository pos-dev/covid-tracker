// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const app = getApp();

let covidApiData;

let riskUpperLimit = 50;
let riskMidLimit = 25;
let riskLowerLimit = 10;

let savedCountyNames;
let savedCountyDataArray = [];

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    headerDate: (((new Date()).getMonth() + 1).toString() + '/' + (new Date()).getDate().toString() + '/' + (new Date()).getFullYear().toString()),

    logoutDialogMask: true,
    logoutDialogMaskClosable: true,
    logoutDialogShowSwitchToggle: false,
    logoutDialogButtons: [
      {text: 'Cancel'},
      {text: 'Logout'}
    ],

    iconSizeNormal: 25,
    iconColorWhite: 'rgb(235, 235, 235)',

    savedCountiesSwiperItems: [
      {
        county: 'Calvert',
        plainName: 'Calvert',
        confirmed_daily: '12',
        confirmed: '2678',
        riskLevel: 'warning'
      },

      {
        county: 'Carroll',
        plainName: 'Carroll',
        confirmed_daily: '2',
        confirmed: '2678',
        riskLevel: 'safe'
      },

      {
        county: 'Baltimore',
        plainName: 'Baltimore',
        confirmed_daily: '120',
        confirmed: '2678',
        riskLevel: 'danger'
      },

      {
        county: 'Kent',
        plainName: 'Kent',
        confirmed_daily: '35',
        confirmed: '2678',
        riskLevel: 'risk'
      }
    ],

    savedCountiesSwiperZero: [ 
      {
        county: 'No Counties Added',
        plainName: 'Calvert',
        confirmed_daily: '---',
        confirmed: '---',
        riskLevel: 'safe'
      }
    ],

    openCountyListToggle: false,

    countyCheckboxItems: [
      {value: 'Allegany', name: 'Allegany'},
      {value: 'Anne Arundel', name: 'Anne Arundel'},
      {value: 'Baltimore', name: 'Baltimore'},
      {value: 'Baltimore City', name: 'Baltimore City'},
      {value: 'Calvert', name: 'Calvert'},
      {value: 'Caroline', name: 'Caroline'},
      {value: 'Carroll', name: 'Carroll'},
      {value: 'Cecil', name: 'Cecil'},
      {value: 'Charles', name: 'Charles'},
      {value: 'Dorchester', name: 'Dorchester'},
      {value: 'Frederick', name: 'Frederick'},
      {value: 'Garrett', name: 'Garrett'},
      {value: 'Harford', name: 'Harford'},
      {value: 'Howard', name: 'Howard'},
      {value: 'Kent', name: 'Kent'},
      {value: 'Montgomery', name: 'Montgomery'},
      {value: 'Prince George\'s', name: 'Prince George\'s'},
      {value: 'Queen Anne\'s', name: 'Queen Anne\'s'},
      {value: 'Somerset', name: 'Somerset'},
      {value: 'St. Mary\'s', name: 'St. Mary\'s'},
      {value: 'Talbot', name: 'Talbot'},
      {value: 'Washington', name: 'Washington'},
      {value: 'Wicomico', name: 'Wicomico'},
      {value: 'Worcester', name: 'Worcester'},
    ]
  },

  onLoad() {
    let that = this;

    // check if user has store their openId
    wx.getStorage({
      key: 'openId',
      success(res) {


        wx.getStorage({
          key: 'userInfo',
          success (res) {

            that.setData({
              hasUserInfo: true,
              userInfo: res.data
            })
          },
          fail(res) {
            that.setData({
              hasUserInfo: false
            })
          }
        })


      },
      fail(res) {
        console.log('user not logged in')
      }
    });
    
    // Default Covid data request
    covidApiData = [
      {
          "_id": "6435858d969cf4e687a73450",
          "uid": 84024001,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24001,
          "county": "Allegany",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Allegany, Maryland, US",
          "population": 70416,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -78.6928,
                  39.6236
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 10561,
          "deaths": 271,
          "confirmed_daily": 35,
          "deaths_daily": 2
      },
      {
          "_id": "6435858d969cf4e687a738c7",
          "uid": 84024003,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24003,
          "county": "Anne Arundel",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Anne Arundel, Maryland, US",
          "population": 579234,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -76.6033,
                  39.0067
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 55599,
          "deaths": 794,
          "confirmed_daily": 118,
          "deaths_daily": 2
      },
      {
          "_id": "6435858d969cf4e687a73d3e",
          "uid": 84024005,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24005,
          "county": "Baltimore",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Baltimore, Maryland, US",
          "population": 827370,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -76.6291,
                  39.4578
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 80427,
          "deaths": 1902,
          "confirmed_daily": 165,
          "deaths_daily": 3
      },
      {
          "_id": "6435858d969cf4e687a741b5",
          "uid": 84024510,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24510,
          "county": "Baltimore City",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Baltimore City, Maryland, US",
          "population": 593490,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -76.6115,
                  39.3021
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 64391,
          "deaths": 1381,
          "confirmed_daily": 63,
          "deaths_daily": 2
      },
      {
          "_id": "6435858d969cf4e687a7462c",
          "uid": 84024009,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24009,
          "county": "Calvert",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Calvert, Maryland, US",
          "population": 92525,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -76.5682,
                  38.5396
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 6002,
          "deaths": 102,
          "confirmed_daily": 11,
          "deaths_daily": 0
      },
      {
          "_id": "6435858d969cf4e687a74aa3",
          "uid": 84024011,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24011,
          "county": "Caroline",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Caroline, Maryland, US",
          "population": 33406,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -75.829,
                  38.8717
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 3508,
          "deaths": 54,
          "confirmed_daily": 9,
          "deaths_daily": 0
      },
      {
          "_id": "6435858d969cf4e687a74f1a",
          "uid": 84024013,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24013,
          "county": "Carroll",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Carroll, Maryland, US",
          "population": 168447,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -77.0237,
                  39.5645
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 12825,
          "deaths": 297,
          "confirmed_daily": 28,
          "deaths_daily": 0
      },
      {
          "_id": "6435858d969cf4e687a75391",
          "uid": 84024015,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24015,
          "county": "Cecil",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Cecil, Maryland, US",
          "population": 102855,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -75.9463,
                  39.5665
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 9534,
          "deaths": 191,
          "confirmed_daily": 48,
          "deaths_daily": 1
      },
      {
          "_id": "6435858d969cf4e687a75808",
          "uid": 84024017,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24017,
          "county": "Charles",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Charles, Maryland, US",
          "population": 163257,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -76.9858,
                  38.5109
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 14977,
          "deaths": 268,
          "confirmed_daily": 15,
          "deaths_daily": 0
      },
      {
          "_id": "6435858d969cf4e687a75c7f",
          "uid": 84024019,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24019,
          "county": "Dorchester",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Dorchester, Maryland, US",
          "population": 31929,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -76.0275,
                  38.4541
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 4436,
          "deaths": 87,
          "confirmed_daily": 10,
          "deaths_daily": 0
      },
      {
          "_id": "6435858d969cf4e687a760f6",
          "uid": 84024021,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24021,
          "county": "Frederick",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Frederick, Maryland, US",
          "population": 259547,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -77.4,
                  39.473
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 25907,
          "deaths": 393,
          "confirmed_daily": 71,
          "deaths_daily": 0
      },
      {
          "_id": "6435858d969cf4e687a7656d",
          "uid": 84024023,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24023,
          "county": "Garrett",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Garrett, Maryland, US",
          "population": 29014,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -79.2736,
                  39.5279
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 3800,
          "deaths": 86,
          "confirmed_daily": 13,
          "deaths_daily": 0
      },
      {
          "_id": "6435858d969cf4e687a769e4",
          "uid": 84024025,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24025,
          "county": "Harford",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Harford, Maryland, US",
          "population": 255441,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -76.3078,
                  39.5501
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 22322,
          "deaths": 370,
          "confirmed_daily": 69,
          "deaths_daily": 2
      },
      {
          "_id": "6435858d969cf4e687a76e5b",
          "uid": 84024027,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24027,
          "county": "Howard",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Howard, Maryland, US",
          "population": 325690,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -76.9313,
                  39.2531
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 23671,
          "deaths": 286,
          "confirmed_daily": 47,
          "deaths_daily": 0
      },
      {
          "_id": "6435858d969cf4e687a772d2",
          "uid": 84024029,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24029,
          "county": "Kent",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Kent, Maryland, US",
          "population": 19422,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -76.0474,
                  39.2498
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 1896,
          "deaths": 57,
          "confirmed_daily": 2,
          "deaths_daily": 1
      },
      {
          "_id": "6435858d969cf4e687a77749",
          "uid": 84024031,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24031,
          "county": "Montgomery",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Montgomery, Maryland, US",
          "population": 1050688,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -77.2036,
                  39.1368
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 85430,
          "deaths": 1734,
          "confirmed_daily": 120,
          "deaths_daily": 1
      },
      {
          "_id": "6435858d969cf4e687a77bc0",
          "uid": 84080024,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 80024,
          "county": "Out of MD",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Out of MD, Maryland, US",
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 0,
          "deaths": 0,
          "confirmed_daily": 0,
          "deaths_daily": 0
      },
      {
          "_id": "6435858d969cf4e687a78037",
          "uid": 84024033,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24033,
          "county": "Prince George's",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Prince George's, Maryland, US",
          "population": 909327,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -76.8496,
                  38.8307
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 102189,
          "deaths": 1757,
          "confirmed_daily": 108,
          "deaths_daily": 1
      },
      {
          "_id": "6435858d969cf4e687a784ae",
          "uid": 84024035,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24035,
          "county": "Queen Anne's",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Queen Anne's, Maryland, US",
          "population": 50381,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -76.0353,
                  39.062
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 4211,
          "deaths": 77,
          "confirmed_daily": 6,
          "deaths_daily": 2
      },
      {
          "_id": "6435858d969cf4e687a78925",
          "uid": 84024039,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24039,
          "county": "Somerset",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Somerset, Maryland, US",
          "population": 25616,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -75.7512,
                  38.1164
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 3450,
          "deaths": 55,
          "confirmed_daily": 2,
          "deaths_daily": 0
      },
      {
          "_id": "6435858d969cf4e687a78d9c",
          "uid": 84024037,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24037,
          "county": "St. Mary's",
          "state": "Maryland",
          "country": "US",
          "combined_name": "St. Mary's, Maryland, US",
          "population": 113510,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -76.6063,
                  38.3006
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 10424,
          "deaths": 174,
          "confirmed_daily": 13,
          "deaths_daily": 0
      },
      {
          "_id": "6435858d969cf4e687a79213",
          "uid": 84024041,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24041,
          "county": "Talbot",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Talbot, Maryland, US",
          "population": 37181,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -76.1088,
                  38.7662
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 3130,
          "deaths": 58,
          "confirmed_daily": 13,
          "deaths_daily": 0
      },
      {
          "_id": "6435858d969cf4e687a7968a",
          "uid": 84090024,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 90024,
          "county": "Unassigned",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Unassigned, Maryland, US",
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 0,
          "deaths": 42,
          "confirmed_daily": 0,
          "deaths_daily": -4
      },
      {
          "_id": "6435858d969cf4e687a79b01",
          "uid": 84024043,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24043,
          "county": "Washington",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Washington, Maryland, US",
          "population": 151049,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -77.82,
                  39.6084
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 21650,
          "deaths": 425,
          "confirmed_daily": 144,
          "deaths_daily": 1
      },
      {
          "_id": "6435858d969cf4e687a79f78",
          "uid": 84024045,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24045,
          "county": "Wicomico",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Wicomico, Maryland, US",
          "population": 103609,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -75.6271,
                  38.373
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 11698,
          "deaths": 234,
          "confirmed_daily": 26,
          "deaths_daily": 0
      },
      {
          "_id": "6435858d969cf4e687a7a3ef",
          "uid": 84024047,
          "country_iso2": "US",
          "country_iso3": "USA",
          "country_code": 840,
          "fips": 24047,
          "county": "Worcester",
          "state": "Maryland",
          "country": "US",
          "combined_name": "Worcester, Maryland, US",
          "population": 52276,
          "loc": {
              "type": "Point",
              "coordinates": [
                  -75.332,
                  38.2127
              ]
          },
          "date": "2021-12-01T00:00:00.000Z",
          "confirmed": 5247,
          "deaths": 125,
          "confirmed_daily": 6,
          "deaths_daily": 0
      }
  ];

  covidApiData = covidApiData.filter(el => {
    return el.county != "Out of MD" && el.county != "Unassigned"
  });

  covidApiData.map(el => {
    if (el.confirmed_daily >= riskUpperLimit) {
      el.riskLevel = 'danger'
    } else if (el.confirmed_daily >= riskMidLimit && el.confirmed_daily < riskUpperLimit) {
      el.riskLevel = "risk"
    } else if (el.confirmed_daily >= riskLowerLimit && el.confirmed_daily < riskMidLimit) {
      el.riskLevel = "warning"
    } else {
      el.riskLevel = "safe"
    }

    el.plainName = el.county.replace(/'/g, '').replace(/\./g, '').replace(/ /g, '');
  })

  console.log('default covid data', covidApiData);

  wx.setStorage({
    key: 'covidData',
    data: covidApiData
  });

/*
    // Covid data request
    wx.showLoading({
      title: 'Loading...',
      mask: true
    });

    wx.request({
      // http://localhost:8000/api/states/getState
      url: 'http://localhost:8000/api/states/getState',
      timeout: 30000,
      success(res) {
        covidApiData = res.data;

        covidApiData = covidApiData.filter(el => {
        return el.county != "Out of MD" && el.county != "Unassigned"
      });

      covidApiData.map(el => {
        if (el.confirmed_daily >= riskUpperLimit) {
          el.riskLevel = 'danger'
        } else if (el.confirmed_daily >= riskMidLimit && el.confirmed_daily < riskUpperLimit) {
          el.riskLevel = "risk"
        } else if (el.confirmed_daily >= riskLowerLimit && el.confirmed_daily < riskMidLimit) {
          el.riskLevel = "warning"
        } else {
          el.riskLevel = "safe"
        }

        el.plainName = el.county.replace(/'/g, '').replace(/\./g, '').replace(/ /g, '');
      })

        console.log(covidApiData);

        wx.setStorage({
          key: 'covidData',
          data: covidApiData
        });

        wx.hideLoading({
          success: (res) => {}
        });
      },
      fail(res) {
        wx.hideLoading({
          success: (res) => {}
        });
      }
    })
    */
  },



// Request and login define here
 getUserProfile(e) {
    console.log('fired off get user profile')
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        let userInfo = res.userInfo;

        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });

        // wx.showLoading({
        //   title: 'Loading...',
        //   mask: true
        // });

        // get openId from the backend
        wx.login({
          success: (res) => {
            
            // http://localhost:8000/api/users/authOpenId
            wx.request({
              url: 'http://localhost:8000/api/users/authOpenId',
              data: {
                "code": res.code
              },
              header: {
                'Content-Type': 'application/json'
              },
              method: "POST",
              timeout: 30000,
              success (res) {

                let openId = res.data.openid

                // Set openId to local storage
                wx.setStorage({
                  key: 'openId',
                  data: openId
                }),

                // http://localhost:8000/api/users/registerUser
                wx.request({
                  url: 'http://localhost:8000/api/users/registerUser',
                  data: {
                    "name": userInfo.nickName,
                    "openId": openId
                  },
                  header: {
                    'Content-Type': 'application/json'
                  },
                  method: "POST",
                  timeout: 30000,
                  success (res) {

                  wx.hideLoading({
                      success: (res) => {}
                  });

                  // Success userInfo to local storage
                  wx.setStorage({
                    key: 'userInfo',
                    data: userInfo
                  });

                  wx.showToast({
                    title: 'Logged in',
                    icon: 'success',
                    duration: 1000,
                    mask: false,
                    complete (res) {

                    }
                  });
                  },
                  fail (res) {


                  }
                });
              },
              fail (res) {


              }
            });
          },
          fail (res) { }
        });
      },
      fail (res) {}
    });
  },

  logoutUser(e) {
    this.setData({
      logoutDialogShowSwitchToggle: true
    });
  },
  confirmLogoutUser(e) {
    let that = this;
    console.log(e);


    if(e.detail.index == 0) {
      this.setData({
        logoutDialogShowSwitchToggle: false
      })
    } else {
        wx.removeStorage({
          key: 'userInfo',
          success(res) {
            that.setData({
              hasUserInfo: false,
              userInfo: {},
              logoutDialogShowSwitchToggle: false
            });
          }
        });
    
        wx.removeStorage({
          key: 'openId',
          success(res) {
    
          },
          fail(res) {
    
          }
        });

        wx.showToast({
          title: 'Logged out',
          icon: 'success',
          duration: 1000,
          mask: false,
          complete(res) {
    
          }
        });
    
        this.setData({
          hasUserInfo: false
        });
    }
  },

  openCountyList(e) {
    if (this.data.openCountyListToggle == false) {
      this.setData({
        openCountyListToggle: true,
        checkboxGroupHolderAniEnter: 'checkbox-group-holder-enter',
        checkboxGroupHolderAniExit: ''
      })
    } else {
      this.setData({
        openCountyListToggle: false,
        checkboxGroupHolderAniEnter: '',
        checkboxGroupHolderAniExit: 'checkbox-group-holder-exit'
      })
    }
  },

  checkboxChange(e) {
    let items = this.data.countyCheckboxItems;
    let values = e.detail.value;

    for (let i = 0; i < items.length; ++i) {
      items[i].checked = false;

      for (let j = 0; j < values.length; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true;
        };
      };
    };

    savedCountyNames = values;
    wx.setStorage({
      key: 'savedCountyNames',
      data: 'savedCountyNames'
    });

    savedCountyDataArray = [];
    covidApiData.map((el) => {
      for (let i = 0; i < savedCountyNames.length; ++i) {
        if (savedCountyNames[i] == el.county && savedCountyNames[i]) {
          savedCountyDataArray = [...savedCountyDataArray, el];
        };
      };
    });

    this.setData({
      savedCountiesSwiperItems: savedCountyDataArray,
      countyCheckboxItems: items
    });
     
    console.log(values);
  }
});