import { DarkmodeIcon } from "@/common/Icon";
import IconButtonNeutral from "@/components/base/button/IconButtonNeutral";
import useColorMode from "@/hooks/useColorMode";

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();


  return (
    <div>
      <IconButtonNeutral icon={<DarkmodeIcon/>} onClick={() => {
          if (typeof setColorMode === 'function') {
            setColorMode(colorMode === 'light' ? 'dark' : 'light');
          }
        }}
        className="p-2"
        />
    </div>
  );
};

export default DarkModeSwitcher;
