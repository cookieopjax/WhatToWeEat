<p align="center">
    <img width="180" src="https://user-images.githubusercontent.com/56196696/177119912-aa336353-9d74-4750-a0d9-a7133e288eb5.png" alt="Vite logo">
</p>

# 今天吃什麼 WhatToWeEat

https://what-to-we-eat.vercel.app/

前端 : Vue (部屬 : Vercel)

後端 : Express (部屬 : Render)

使用者可以註冊自己的帳號，手動加入餐廳或者用google map去選

後端會儲存使用者加入的餐廳

然後使用者使用時，會推薦一個他已加入餐廳給他

在某些情況下，會依據使用者位置推薦一些附近的餐廳


## 後端API初步設想 

#### 可以先做的部分
* 使用者註冊，輸入帳號及密碼
* 使用者登入，回傳token
* 使用者傳一筆餐廳(包含名稱、地址、電話、菜單圖片等)，後端加入清單 
* 使用者針對某一筆已有餐廳編輯
* 使用者請求，驗證後回傳餐廳清單(全部)
* 使用者請求，由餐廳清單隨機挑選一個餐廳回傳
* 使用者傳確定會吃的餐廳，資料庫記錄起來

(以上使用者做任何步驟皆須傳jwt token驗證身分)

#### 延伸部分 (暫時可先不做，之後慢慢導入)

* 使用者傳位置，由後端實作一些商業邏輯，如依據他過去喜愛吃的類型又或是近期吃的類型，推薦他一些未加入的餐廳去做加入，這一筆推薦清單回傳前端
* 相比上面增加更多商業邏輯 

---
