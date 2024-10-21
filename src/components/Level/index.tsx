import { Pressable, PressableProps, Text } from "react-native";

import { THEME } from "../../styles/theme";
import { styles } from "./styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { useEffect } from "react";

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
};

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
};

export function Level({
  title,
  type = "EASY",
  isChecked = false,
  ...rest
}: Props) {
  const scale = useSharedValue(1.5);
  const checked = useSharedValue(1);

  const COLOR = TYPE_COLORS[type];

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ["transparent", COLOR]
      ),
    };
  });

  function OnPressIn() {
    scale.value = withTiming(1.2);
  }
  function OnPressOut() {
    scale.value = withTiming(1);
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0);
  }, [isChecked]);

  return (
    <PressableAnimated
      onPressIn={OnPressIn}
      onPressOut={OnPressOut}
      {...rest}
      style={[
        styles.container,
        {
          borderColor: COLOR,
        },
        animatedContainerStyle,
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: isChecked ? THEME.COLORS.GREY_100 : COLOR },
        ]}
      >
        {title}
      </Text>
    </PressableAnimated>
  );
}
