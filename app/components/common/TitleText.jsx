export default function TitleText({ mainText, subText }) {
  return (
    <>
      {/* タイトル */}
      <div className="mb-6 text-center">
        <h2
          className={`text-2xl font-bold text-gray-900 md:text-5xl ${
            subText ? 'mb-2' : ''
          }`}
        >
          {mainText}
        </h2>
        {subText && <p className="text-lg">{subText}</p>}
      </div>
    </>
  );
}
