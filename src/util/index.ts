export interface ListGrouped<T> {
    key: string;
    items: T[];
}

export const grouped = <T>(
    objetoArray: Array<T>,
    propriedade: string,
): ListGrouped<T>[] => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return objetoArray.reduce((acc: any, obj: any) => {
        if (!Array.isArray(acc)) {
            acc = [];
        }

        const key = obj[propriedade];
        const index = (acc as ListGrouped<T>[]).map(m => m.key).indexOf(key);
        if (index == -1) {
            acc.push({
                key: key,
                items: [obj],
            });
        } else {
            (acc as ListGrouped<T>[])[index].items.push(obj);
        }
        return acc;
    }, {});
};
