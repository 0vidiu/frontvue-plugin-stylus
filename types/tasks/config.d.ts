declare const _default: {
    description: string;
    hook: string;
    name: string;
    taskFn: () => boolean;
    configDefaults: {
        sourceDir: string;
        entryPoint: string;
        buildDir: string;
        buildFilename: string;
    };
    configQuestionnaire: {
        namespace: string;
        questions: {
            default: string;
            message: string;
            name: string;
            type: string;
        }[];
    };
};
export default _default;
