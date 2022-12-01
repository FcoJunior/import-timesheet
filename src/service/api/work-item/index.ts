import api from '..';

const defaultWorkItemTypesFields: string[] = ['id', 'name'];
const defaultIssueWorkItemFields: string[] = ['id', 'name'];

export interface WorkItemType {
    $type: string;
    id: string;
    name: string;
}

export interface IssueWorkItem {
    usesMarkdown: boolean;
    id?: string;
    text: string;
    date: number;
    author: {
        id: string;
    };
    duration: {
        minutes: number;
    };
    type?: {
        id: string;
    };
}

export const getWorkItemTypes = async (): Promise<WorkItemType[]> =>
    api
        .get('admin/timeTrackingSettings/workItemTypes', {
            params: { fields: defaultWorkItemTypesFields.join() },
        })
        .then(response => {
            return response.data;
        });

export const createIssueWorkItem = async (
    issueId: string,
    issue: IssueWorkItem,
): Promise<IssueWorkItem> =>
    api
        .post(`issues/${issueId}/timeTracking/workItems`, issue, {
            params: { fields: defaultIssueWorkItemFields.join() },
        })
        .then(response => {
            return response.data;
        });
