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
    <div className='p-3 bg-blue-50 rounded-lg border border-blue-200'>
      <div className='text-center'>
        <div className='flex flex-wrap gap-2 text-xs'>
          {selectedMoods.category && (
            <span className='bg-white px-2 py-1 rounded border text-blue-700'>
              {getMood('category', selectedMoods.category)}
            </span>
          )}
          {selectedMoods.taste && (
            <span className='bg-white px-2 py-1 rounded border text-green-700'>
              {getMood('taste', selectedMoods.taste)}
            </span>
          )}
          {selectedMoods.color && (
            <span className='bg-white px-2 py-1 rounded border text-red-700'>
              {getMood('color', selectedMoods.color)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
