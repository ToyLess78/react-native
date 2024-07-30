import type {
	NavigatorScreenParams,
	CompositeScreenProps,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps as RNBottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { ROUTE_NAME } from "../enums";
import { Inspiration } from "./inspiration.type";

type NavigationRoute = (typeof ROUTE_NAME)[keyof typeof ROUTE_NAME];

type RootStackParamList = {
	[ROUTE_NAME.BOTTOM_TABS_NAVIGATOR]: NavigatorScreenParams<BottomTabsParamList>;
	[ROUTE_NAME.ADD_INSPIRATION]: undefined;
	Dashboard: {
		inspiration?: Inspiration;
	};
};

type BottomTabsParamList = {
	[ROUTE_NAME.DASHBOARD]:
		| {
		inspiration?: Inspiration;
	}
		| undefined;
	[ROUTE_NAME.SETTINGS]: undefined;
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

type RootStackScreenProps<T extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, T>;

type BottomTabsScreenProps<T extends keyof BottomTabsParamList> =
	CompositeScreenProps<
		RNBottomTabScreenProps<BottomTabsParamList, T>,
		NativeStackScreenProps<
			RootStackParamList,
			typeof ROUTE_NAME.BOTTOM_TABS_NAVIGATOR
		>
	>;

export type {
	NavigationRoute,
	RootStackParamList,
	BottomTabsParamList,
	RootStackScreenProps,
	BottomTabsScreenProps,
};
