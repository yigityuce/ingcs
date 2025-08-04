import {createStore} from 'zustand/vanilla';
import {faker} from '@faker-js/faker';
import {immer} from 'zustand/middleware/immer';
import {createJSONStorage, persist} from 'zustand/middleware';

/**
 * @param {number} count
 */
const createEmployees = (count) => {
  return faker.helpers.multiple(
    () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email(firstName, lastName);
      return {
        email,
        firstName,
        lastName,
        dateOfEmployment: faker.date.past(10),
        dateOfBirth: faker.date.birthdate({min: 25, max: 50, mode: 'age'}),
        phoneNumber: faker.phone.number({style: 'international'}),
        department: faker.helpers.arrayElement(['Analytics', 'Tech']),
        position: faker.helpers.arrayElement(['Junior', 'Medior', 'Senior']),
      };
    },
    {count}
  );
};

export const appDataStore = createStore(
  persist(
    immer((set) => ({
      employees: createEmployees(750),
      employeesTableCurrentPage: 1,
      setEmployeesTableCurrentPage: (page) =>
        set((state) => {
          state.employeesTableCurrentPage = page;
        }),
      reinitEmployees: () =>
        set((state) => {
          state.employees = createEmployees(750);
        }),
      editEmployee: (email, employee) =>
        set((state) => {
          state.employees = state.employees.map((e) =>
            e.email === email ? employee : e
          );
        }),
      addEmployee: (employee) =>
        set((state) => {
          state.employees.unshift(employee);
        }),
      deleteEmployee: (employee) =>
        set((state) => {
          state.employees = state.employees.filter(
            (e) => e.email !== employee.email
          );
        }),
    }))
  ),
  {
    name: 'app-data-store',
    storage: createJSONStorage(() => localStorage, {
      serialize: (state) =>
        JSON.stringify(state, (key, value) => {
          if (value instanceof Date) return value.toISOString();
          return value;
        }),
      deserialize: (state) =>
        JSON.parse(state, (key, value) => {
          if (typeof value === 'string' && !isNaN(Date.parse(value))) {
            return new Date(value);
          }
          return value;
        }),
    }),
  }
);

appDataStore.setState({
  employees: appDataStore.getState().employees || [],
});
