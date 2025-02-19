
// Сбор первичных состояний всех EventType и EventData
function collectEventPathsAndValues(editor) {
    const eventDict = {};

    // Ищем все поля, соответствующие event_type и event_data
    Object.keys(editor.editors).forEach((eventTypePath) => {
        const eventTypeEditor = editor.getEditor(eventTypePath);

        if (eventTypePath.match(/^root\.blocks\.\d+\.events\.\d+\.event_type$/)) {
            const eventTypeValue = eventTypeEditor.getValue();

            const eventDataPath = eventTypePath.replace(/\.event_type$/, ".event_data");
            const eventDataEditor = editor.getEditor(eventDataPath);
            const eventDataValue = eventDataEditor.getValue();

            eventDict[eventTypePath] = eventTypeValue
            eventDict[eventDataPath] = eventDataValue
        }
    });

    // console.log("Collected Event Paths and Values:", eventDict);
    return eventDict;
}


// Функция для обработки изменений в редакторе
function сhangeEventDataAsEventType(editor, eventsMapper, previousEventTypeValueStorage) {
    Object.keys(editor.editors).forEach((eventTypePath) => {
        // Listen only changes of eventType Fields
        if (eventTypePath.match(/^root\.blocks\.\d+\.events\.\d+\.event_type$/)) {
            const eventDataPath = eventTypePath.replace(/\.event_type$/, ".event_data");

            const prevEventTypeValue = previousEventTypeValueStorage[eventTypePath];
            const prevEventDataValue = previousEventTypeValueStorage[eventDataPath];

            const newEventTypeValue = editor.getEditor(eventTypePath).getValue();
            const newEventDataValue = editor.getEditor(eventDataPath).getValue();

//            console.log(`eventTypePath: ${eventTypePath}`)
//            console.log(`previousEventTypeValueStorage: ${previousEventTypeValueStorage}`)
//            console.log(`newEventTypeValue: ${newEventTypeValue}`)
//            console.log(`newEventDataValue: ${newEventDataValue}`)
//            console.log(`prevEventTypeValue: ${prevEventTypeValue}`)
//            console.log(`prevEventDataValue: ${prevEventDataValue}`)

            // Меняем EventData только если пользователь руками изменил EventType. Меняем всегда на дефолт
            if (prevEventTypeValue != newEventTypeValue) {
                editor.getEditor(eventDataPath).setValue(eventsMapper[newEventTypeValue]);

                previousEventTypeValueStorage[eventTypePath] = newEventTypeValue;
                previousEventTypeValueStorage[eventDataPath] = newEventDataValue;
            }
        }
    });
}


// make all text areas expanded to text size
function expandTextareas(editorHolderId) {
    const textareas = document.querySelectorAll(`#${editorHolderId} textarea`);
    textareas.forEach((textarea) => {
        textarea.style.height = "auto"; // Reset height
        textarea.style.height = textarea.scrollHeight + "px"; // Adjust height
    });
}