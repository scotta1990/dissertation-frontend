import { useSelector } from "react-redux";

function useFeatureFlag(name) {
  const features = useSelector((store) => store.features.features);
  const feature = features.find((feature) => feature.name === name);

  return feature && feature.active;
}

export default useFeatureFlag;
