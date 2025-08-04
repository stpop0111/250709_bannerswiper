export default function TitleText({ mainText, subText }) {
  return (
    <>
      {/* タイトル */}
      <div className='text-center mb-4'>
        <h2
          className={`text-2xl md:text-5xl font-bold text-gray-900 ${
            subText ? 'mb-2' : ''
          }`}
        >
          {mainText}
        </h2>
        {subText && <p className='text-lg'>{subText}</p>}
      </div>
    </>
  );
}
