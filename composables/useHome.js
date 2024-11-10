export const useHome = () => {
  // 存放最新消息的資料
  const newsList = ref([]);
  // 判斷是否正在載入資料
  const isLoading = ref(false);

  const getNews = async () => {
    // 最新消息API 的網址
    const url = `https://nuxr3.zeabur.app/api/v1/home/news/`;
    // 開始載入資料
    isLoading.value = true;

    // 使用 try...catch 語法處理錯誤 
    try{
      // 使用 fetch API 發送請求
      const response = await fetch(url);

      // 判斷狀態碼是否為 200
      if(response.ok){
        // 將回傳的 JSON 資料解析成物件
        const {result} = await response.json();
        // 將資料存入 newsList 變數
        newsList.value = result;
        // 資料載入完成
        isLoading.value = false;
        return;
      }
      // 若狀態碼不是 200，則拋出錯誤
      throw new Error(`發生錯誤：${response.status}`);
    }catch(error){
      // 顯示錯誤訊息
      if(import.meta.client){
        // 若在瀏覽器端執行，則顯示錯誤訊息在瀏覽器
        alert(`Error: ${error.message}`);
      }else{
        // 若在伺服器端執行，則顯示錯誤訊息在終端機
        console.error(`Error fetching news: ${error.message}`);
      }
      isLoading.value = false;
    }
  };

  return {newsList, isLoading, getNews};
};
