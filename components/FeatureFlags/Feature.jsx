import { useSelector } from "react-redux";

const Feature = ({ name, children }) => {
  const features = useSelector((store) => store.features.features);
  const feature = features.find((feature) => feature.name === name);

  if (feature && feature.active) {
    return children;
  }

  return null;
};

export default Feature;
