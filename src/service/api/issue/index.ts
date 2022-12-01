import api from '..';

const defaultIssueFields: string[] = ['id', 'idReadable'];

export interface Issue {
    $type: string;
    id: string;
    idReadable: string;
}

export const getIssues = async (issuesId: string[]): Promise<Issue[]> =>
    api
        .get('issues', {
            params: {
                fields: defaultIssueFields.join(),
                query: `issue Id:${issuesId.join()}`,
            },
        })
        .then(response => {
            return response.data;
        });
