declare const _default: ({
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
    dependencies: {
        devDependencies: {
            jeet: string;
            rupture: string;
        };
    };
} | {
    description: string;
    hook: string;
    name: string;
    taskFn: (done: any, { logger, config, paths, env, gulp }?: any) => Promise<any>;
    configDefaults?: undefined;
    configQuestionnaire?: undefined;
    dependencies?: undefined;
})[];
export default _default;
