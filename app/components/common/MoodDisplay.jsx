import { moodOptions, axisLabels } from '../../data/options';

export default function MoodDisplay({ selectedMoods }) {
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

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
      <div className="text-center">
        <div className="flex flex-wrap gap-2 text-xs">
          {selectedMoods.category && (
            <span className="rounded border bg-white px-2 py-1 text-blue-700">
              {getMood('category', selectedMoods.category)}
            </span>
          )}
          {selectedMoods.taste && (
            <span className="rounded border bg-white px-2 py-1 text-green-700">
              {getMood('taste', selectedMoods.taste)}
            </span>
          )}
          {selectedMoods.color && (
            <span className="rounded border bg-white px-2 py-1 text-red-700">
              {getMood('color', selectedMoods.color)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
