import Button from "../common/Button"

export default function LibraryScreen ({changeTitle}){
  return (
    <div className="max-w-2xl">
      <>準備中だよ🐌</>
      <Button
        onClick={changeTitle}
        variant="optional"
      >
        タイトルに戻る
      </Button>
    </div>
  )
}
