import { getPreferenceValue } from "./getPreference";

export function preferenceHosterSelection() {
    return getPreferenceValue("hoster_selection");
}

export function preferenceTypeSelection() {
    return getPreferenceValue("type_selection");
}


