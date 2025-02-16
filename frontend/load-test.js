import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 }, // Ramp-up to 10 users over 10 seconds
    { duration: '20s', target: 10 }, // Stay at 10 users for 20 seconds
    { duration: '5s', target: 0 },   // Ramp-down to 0 users over 5 seconds
  ],
};

export default function () {
  let res = http.get('http://localhost:8080'); // Updated to match the Docker container port
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}