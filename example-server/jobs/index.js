const path = require('path');
const dayjs = require('dayjs');

module.exports = [
  // runs `./jobs/foo-bar.js` on start
  {
    name: 'foo-bar',
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-1.js` on the last day of the month
  {
    name: 'worker-1',
    interval: 'on the last day of the month',
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-2.js` every other day
  {
    name: 'worker-2',
    interval: 'every 2 days',
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-3.js` at 10:15am and 5:15pm every day except on Tuesday
  {
    name: 'worker-3',
    interval: 'at 10:15 am also at 5:15pm except on Tuesday',
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-4.js` at 10:15am every weekday
  {
    name: 'worker-4',
    cron: '15 10 ? * *',
    cronValidate: {
      override: {
        useBlankDay: true
      }
    },
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-5.js` on after 10 minutes have elapsed
  {
    name: 'worker-5',
    timeout: '10m',
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-6.js` after 1 minute and every 5 minutes thereafter
  {
    name: 'worker-6',
    timeout: '1m',
    interval: '5m',
    path: path.join(__dirname, 'long.js')
    // this is unnecessary but shows you can pass a Number (ms)
    // interval: ms('5m')
  },

  // runs `./jobs/worker-7.js` after 3 days and 4 hours
  {
    name: 'worker-7',
    // this example uses `human-interval` parsing
    timeout: '3 days and 4 hours',
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-8.js` at midnight (once)
  {
    name: 'worker-8',
    timeout: 'at 12:00 am',
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-9.js` every day at midnight
  {
    name: 'worker-9',
    interval: 'at 12:00 am',
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-10.js` at midnight on the 1st of every month
  {
    name: 'worker-10',
    cron: '0 0 1 * *',
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-11.js` at midnight on the last day of month
  {
    name: 'worker-11',
    cron: '0 0 L * *',
    cronValidate: {
      override: {
        useLastDayOfMonth: true
      }
    },
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-12.js` at a specific Date (e.g. in 3 days)
  {
    name: 'worker-12',
    // <https://github.com/iamkun/dayjs>
    date: dayjs().add(3, 'days').toDate(),
    path: path.join(__dirname, 'long.js')
    // you can also use momentjs
    // <https://momentjs.com/>
    // date: moment('1/1/20', 'M/D/YY').toDate()
    // you can pass Date instances (if it's in the past it will not get run)
    // date: new Date()
  },

  // runs `./jobs/worker-13.js` on start and every 2 minutes
  {
    name: 'worker-13',
    interval: '2m',
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-14.js` on start with custom `new Worker` options (see below)
  {
    name: 'worker-14',
    // <https://nodejs.org/api/worker_threads.html#worker_threads_new_worker_filename_options>
    worker: {
      workerData: {
        foo: 'bar',
        beep: 'boop'
      }
    },
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-15.js` **NOT** on start, but every 2 minutes
  {
    name: 'worker-15',
    timeout: false, // <-- specify `false` here to prevent default timeout (e.g. on start)
    interval: '2m',
    path: path.join(__dirname, 'long.js')
  },

  // runs `./jobs/worker-16.js` on January 1st, 2022
  // and at midnight on the 1st of every month thereafter
  {
    name: 'worker-16',
    date: dayjs('1-1-2022', 'M-D-YYYY').toDate(),
    cron: '0 0 1 * *',
    path: path.join(__dirname, 'long.js')
  }
];
