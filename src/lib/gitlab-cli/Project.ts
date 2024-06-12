export type ProjectTemplate = {
    source: string,
    name: string
}
export type ProjectPermission = {
    samlGroup: string,
    gitlabRole: 'Guest'|'Reporter'|'Developer'|'Maintainer'|'AdessoOwner'
}
export type Project = {
    subProjects:  Project[]
    slug: string[],
    name: string,
    templates: ProjectTemplate[],
    permissions: ProjectPermission[],
    permissionMode: 'enforce'|'report'|'skip'
}