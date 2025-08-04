import { moodOptions, axisLabels } from '../../data/options';
import { CloseButton } from '../common/Icons';
import gsap from 'gsap';

export default function MoodDisplay({
  selectedMoods,
  onDeleteMoodType,
  readOnly = false,
}) {
  // idからラベルを検索する
  // =======================================
  const getMood = (axis, id) => {
    if (!id) {
      return null;
    }
    const option = moodOptions[axis].find((item) => item.id === id);
    return option ? option.label : null;
  };

  const hasSelectedMood =
    selectedMoods.category || selectedMoods.taste || selectedMoods.color;

  if (!hasSelectedMood) {
    return null;
  }

  const handleDeletemood = (moodType) => {
    const element = document.querySelector(`[data-mood="${moodType}"]`);

    gsap.to(element, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        // 3. アニメーション完了後に実際の削除
        onDeleteMoodType(moodType);
      },
    });
  };

  return (
    <div className="flex flex-wrap gap-2 text-base">
      {selectedMoods.category && (
        <span
          className="flex items-center gap-2 rounded border bg-white p-2 text-blue-700"
          data-mood="category"
        >
          {!readOnly && (
            <CloseButton
              color={'blue-700'}
              onClick={() => handleDeletemood('category')}
            />
          )}
          {getMood('category', selectedMoods.category)}
        </span>
      )}
      {selectedMoods.taste && (
        <span
          className="flex items-center gap-2 rounded border bg-white p-2 text-green-700"
          data-mood="taste"
        >
          {!readOnly && (
            <CloseButton
              color={'green-700'}
              onClick={() => handleDeletemood('taste')}
            />
          )}
          {getMood('taste', selectedMoods.taste)}
        </span>
      )}
      {selectedMoods.color && (
        <span
          className="flex items-center gap-2 rounded border bg-white p-2 text-red-700"
          data-mood="color"
        >
          {!readOnly && (
            <CloseButton
              color={'red-700'}
              onClick={() => handleDeletemood('color')}
            />
          )}
          {getMood('color', selectedMoods.color)}
        </span>
      )}
    </div>
  );
}
