export const editExerciseName = (exName: string) => {
 const nameSplit = exName.split('-');
 const nameWithSpaces = nameSplit.join(' ');
 return nameWithSpaces.charAt(0).toUpperCase() + nameWithSpaces.slice(1);
};
