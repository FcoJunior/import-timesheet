import moment from 'moment';
import data from './data/timesheets.json';
import { Timesheet } from './model';
import { getIssues } from './service/api/issue';
import { currentUser } from './service/api/user';
import {
    createIssueWorkItem,
    getWorkItemTypes,
    IssueWorkItem,
} from './service/api/work-item';
import { grouped } from './util';

// eslint-disable-next-line no-console
const log = console.log;

export const main = async () => {
    const timesheets = data as Array<Timesheet>;
    const user = await currentUser();

    log('\n👤 Current user');
    // eslint-disable-next-line no-console
    console.table(user);

    const workItemTypes = await getWorkItemTypes();
    const tasks = [...new Set(timesheets.map(m => m.Task))];
    const issues = await getIssues(tasks);

    const listGrouped = grouped<Timesheet>(timesheets, 'Start_date');

    listGrouped.forEach(group => {
        // eslint-disable-next-line no-console
        console.log('\n🚩 Importing date: ', group.key);

        group.items.forEach(async item => {
            const workItem: IssueWorkItem = {
                usesMarkdown: true,
                date: moment(item.Start_date, 'DD-MM-YY').valueOf(),
                duration: {
                    minutes: Math.round(
                        moment.duration(item.Duration).asMinutes(),
                    ),
                },
                text: item.Description,
                author: { id: user.id },
            };

            const workItemType = workItemTypes.find(
                x => x.name === item.Category,
            );

            const issue = issues.find(f => f.idReadable === item.Task);

            if (workItemType) {
                workItem.type = { id: workItemType.id };
            }

            log(issue!.id, workItem);
            const issueWorkItem = await createIssueWorkItem(
                issue!.id,
                workItem,
            );

            log('\n🟢 Timesheet integrated ==> ' + issueWorkItem.id);
        });
    });
};
