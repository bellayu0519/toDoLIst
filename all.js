//列表的位置
let list = document.querySelector("ul.list");

//待完成項目
let list_footer = document.querySelector(".list_footer p");

//清除已完成項目按鈕
let list_clear = document.querySelector(".list_footer a");

//新增按鈕
let btn_add = document.querySelector(".card.input .btn_add");

//輸入新增代辦事項的input
let save_input = document.querySelector('.card.input input[type="text"]');

//頁籤區塊
let tab = document.querySelector("ul.tab");
//頁籤按鈕
let tabli = document.querySelectorAll("ul.tab li");
//頁籤初始當前模式
let tabsVal = "全部";

//初始資料
let data = [
  {
    idNum: "",
    content: "去市場買菜",
    checked: "",
  },
  {
    idNum: "",
    content: "曬床單",
    checked: "",
  },
];

//資料初始化
function renderData(data) {
  let str = ``;
  let listNum = 0;

  data.forEach(function (item, index) {
    str += `<li data-idNum="${index}">
            <label class="checkbox" for="">
              <input type="checkbox" ${item.checked}/>
              <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-id="${index}"></a>
          </li>`;
  });
  list.innerHTML = str;

  //計算有幾個待完成項目

  listNum = data.filter(function (item, index) {
    return item.checked === "";
  }).length;
  list_footer.textContent = `${listNum}個待完成項目`;
}
renderData(data);

//製作新增功能
btn_add.addEventListener("click", function (e) {
  if (save_input.value.trim() === "") {
    alert("待辦事項內容不可為空");
    return;
  }
  let obj = {
    content: save_input.value.trim(),
    checked: "",
  };

  data.push(obj);
  renderData(data);
  save_input.value = "";
});

//刪除和狀態切換功能
list.addEventListener("click", function (e) {
  let parentLi = e.target.closest("li");
  if (!parentLi) return; // 如果點擊的不是列表項目，終止函式
  //避免處理那些點擊了 <ul> 或空白區域的情況。

  let id = parentLi.getAttribute("data-idNum");

  // 刪除功能
  if (e.target.classList.contains("delete")) {
    data.splice(id, 1); // 從資料陣列中移除該項目
    update();
    return;
  }

  // 狀態切換功能
  if (e.target.tagName === "INPUT") {
    //確保只有當點擊的目標是 input 元素時才會執行後續代碼。
    if (e.target.checked) {
      //即 input 被勾選時
      data[id].checked = "checked";
    } else {
      data[id].checked = "";
    }
    update();
  }
});

// 頁籤切換的當前模式按鈕樣式與功能
tabli.forEach(function (item) {
  item.addEventListener("click", function () {
    // 移除所有頁籤的 active 樣式
    tabli.forEach(function (item) {
      item.classList.remove("active");
    });
    //為當前點擊的頁籤添加 active 樣式
    //放在forEach外是為了只對被點擊的頁籤進行操作，而不是對所有頁籤進行操作，
    //從而確保頁籤切換時只有一個頁籤顯示為活躍狀態
    //如果放裡面的話每個被遍歷到的頁籤都會被加上active
    this.classList.add("active");
    // 更新當前頁籤狀態
    tabsVal = this.textContent.trim();
    // 更新列表顯示
    update();
  });
});

// 清除已完成項目
list_clear.addEventListener("click", function (e) {
  e.preventDefault(); // 防止默認行為
  data = data.filter(function (item) {
    return item.checked === "";
  });
  update();
});

function update() {
  let newdata = []; //用來儲存篩選後的待辦事項

  if (tabsVal === "全部") {
    newdata = data;
  } else if (tabsVal === "待完成") {
    newdata = data.filter(function (item) {
      return item.checked === "";
    });
  } else if (tabsVal === "已完成") {
    newdata = data.filter(function (item) {
      return item.checked === "checked";
    });
  }

  renderData(newdata);
}
