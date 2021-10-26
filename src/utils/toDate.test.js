import { toDate } from './toDate.ts';

test('Custom toDate function:', () => {
    expect(toDate({seconds: 42})).toEqual(new Date(42000));
});
