export default {
  headers: [
    {
      text: '글 번호',
      align: 'left',
      value: 'contentId',
    },
    { text: '작성일', value: 'writeDate', sortable: false},
    { text: '추천수', value: 'like' },
    { text: '글제목', value: 'title', sortable: false },
    { text: '작성자', value: 'writer', sortable: false },
    { text: '조회수', value: 'readCount' },
  ],
  items: [
    {
      contentId: 1,
      writeDate: "2019-11-14",
      like: 0,
      title: "저 싸움 잘합니다.",
      writer: "김현광",
      readCount: 0,
      content: "아직 왼손 남았습니다."
    },
    {
      contentId: 2,
      writeDate: "2019-11-14",
      like: 2,
      title: "밥 왔어 밥 먹어",
      writer: "임태혁",
      readCount: 15,
      content: "앙~배불띠."

    },
    {
      contentId: 3,
      writeDate: "2019-11-14",
      like: 9999,
      title: "안녕하세요 운영자 입니다.",
      writer: "BestOW",
      readCount: 9999,
      content: "잘 부탁 드립니다."
    }
  ],
}