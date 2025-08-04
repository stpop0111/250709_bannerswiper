import { moodOptions, axisLabels } from '../../data/options';
import { CloseButton } from '../common/Icons';

export default function MoodDisplay({ selectedMoods, onDeleteMoodType }) {
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
    onDeleteMoodType(moodType)
  };

  return (
    <div className="mb-4 w-full">
      <div className="mx-auto w-fit rounded-lg border border-blue-200 bg-blue-50 p-3">
        <div className="flex flex-wrap gap-2 text-base">
          {selectedMoods.category && (
            <span className="flex items-center gap-2 rounded border bg-white p-2 text-blue-700">
              <CloseButton
                color={'blue-700'}
                onClock={() => handleDeletemood('category')}
              />
              {getMood('category', selectedMoods.category)}
            </span>
          )}
          {selectedMoods.taste && (
            <span className="flex items-center gap-2 rounded border bg-white p-2 text-green-700">
              <CloseButton
                color={'green-700'}
                onClock={() => handleDeletemood('taste')}
              />
              {getMood('taste', selectedMoods.taste)}
            </span>
          )}
          {selectedMoods.color && (
            <span className="flex items-center gap-2 rounded border bg-white p-2 text-red-700">
              <CloseButton
                color={'red-700'}
                onClock={() => handleDeletemood('color')}
              />
              {getMood('color', selectedMoods.color)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
