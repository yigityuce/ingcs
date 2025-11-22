import {createStore} from 'zustand/vanilla';
import {isValidPhoneNumber} from 'libphonenumber-js';
import {faker} from '@faker-js/faker';
import {immer} from 'zustand/middleware/immer';
import {createJSONStorage, persist} from 'zustand/middleware';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_VIEW_MODE,
  DEPARTMENT,
  POSITION,
} from '../../models';

const generateValidPhoneNumber = (generator = () => undefined) => {
  let iteration = 0;
  while (iteration < 100) {
    const generated = generator();
    if (isValidPhoneNumber(generated)) {
      return generated;
    }
  }
  return generator();
};

/** @param {number} count */
const createEmployees = (count) => {
  return faker.helpers.multiple(
    () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet
        .email({
          firstName,
          lastName,
          provider: 'ing.com',
        })
        .toLowerCase();
      return {
        email,
        firstName,
        lastName,
        dateOfEmployment: faker.date.past(10),
        dateOfBirth: faker.date.birthdate({
          min: 25,
          max: 50,
          mode: 'age',
        }),
        phoneNumber: generateValidPhoneNumber(() =>
          faker.phone.number({style: 'international'})
        ),
        department: faker.helpers.arrayElement(Object.values(DEPARTMENT)),
        position: faker.helpers.arrayElement(Object.values(POSITION)),
      };
    },
    {count}
  );
};

export const store = createStore(
  persist(
    immer((set) => ({
      employees: createEmployees(750),
      language: DEFAULT_LANGUAGE.code,
      viewMode: DEFAULT_VIEW_MODE,
      selectedEmployees: [],
      searchTerm: '',
      // TODO: implement sorting
      pagination: {
        page: 1,
        pageSize: 10,
      },
      setSearchTerm: (term) =>
        set((state) => {
          state.searchTerm = term;
        }),
      setLanguage: (language) =>
        set((state) => {
          state.language = language;
        }),
      setViewMode: (mode) =>
        set((state) => {
          state.viewMode = mode;
        }),
      setPage: (page) =>
        set((state) => {
          state.pagination = {...state.pagination, page};
          state.selectedEmployees = [];
        }),
      setPageSize: (pageSize) =>
        set((state) => {
          state.pagination = {...state.pagination, pageSize};
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
      toggleEmployeeSelection: (employee) =>
        set((state) => {
          if (state.selectedEmployees.includes(employee.email)) {
            state.selectedEmployees = state.selectedEmployees.filter(
              (e) => e !== employee.email
            );
          } else {
            state.selectedEmployees.push(employee.email);
          }
        }),
      setEmployeeSelection: (employees) =>
        set((state) => {
          state.selectedEmployees = employees.map((e) => e.email);
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
