import { toDate } from './toDate';

test('Custom toDate function:', () => {
    expect(toDate({seconds: 42, nanoseconds: 0})).toEqual(new Date(42000));
});
