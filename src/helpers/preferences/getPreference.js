
function getSourcePreferences() {
    return [
        {
            key: "preferred_domain1",
            title: "Preferred domain",
            summary: "",
            valueIndex: 0,
            entries: [
                "aniwave.to",
                "aniwave.ws",
                "aniwave.li",
                "aniwave.vc"
            ],
            entryValues: [
                "https://aniwave.to",
                "https://aniwave.ws",
                "https://aniwave.li",
                "https://aniwave.vc"
            ]
        },
        {
            key: "preferred_quality",
            title: "Preferred Quality",
            summary: "",
            valueIndex: 0,
            entries: ["1080p", "720p", "480p", "360p"],
            entryValues: ["1080", "720", "480", "360"]
        },
        {
            key: "preferred_language",
            title: "Preferred Type",
            summary: "",
            valueIndex: 0,
            entries: ["Sub", "Softsub", "Dub"],
            entryValues: ["Sub", "Softsub", "Dub"]
        },
        {
            key: "preferred_server",
            title: "Preferred server",
            summary: "",
            valueIndex: 0,
            entries: [
                "VidPlay",
                "MyCloud",
                "Filemoon",
                "StreamTape",
                "Mp4Upload"
            ],
            entryValues: [
                "vidplay",
                "mycloud",
                "filemoon",
                "streamtape",
                "mp4upload"
            ]
        },
        {
            key: "hoster_selection",
            title: "Enable/Disable Hosts",
            summary: "",
            entries: [
                "VidPlay",
                "MyCloud",
                "Filemoon",
                "StreamTape",
                "Mp4Upload"
            ],
            entryValues: [
                "vidplay",
                "mycloud",
                "filemoon",
                "streamtape",
                "mp4upload"
            ],
            values: [
                "vidplay",
                "mycloud"
            ]
        },
        {
            key: "type_selection",
            title: "Enable/Disable Type",
            summary: "",
            entries: ["Sub", "Softsub", "Dub"],
            entryValues: ["sub", "softsub", "dub"],
            values: ["sub", "softsub", "dub"]
        }
    ];
}


const preferences = getSourcePreferences();


export function getPreferenceValue(key) {
    const preference = preferences.find(p => p.key === key);
    if (!preference) {
        throw new Error(`Preference with key ${key} not found.`);
    }
    if(preference.valueIndex && preference.entryValues[preference.valueIndex]){
    return preference.entryValues[preference.valueIndex];
    }else{
         return preference.values
    }
}