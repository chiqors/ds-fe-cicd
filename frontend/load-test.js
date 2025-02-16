import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp-up to 20 users over 30 seconds
    { duration: '1m', target: 20 },  // Stay at 20 users for 1 minute
    { duration: '10s', target: 0 },  // Ramp-down to 0 users over 10 seconds
  ],
};

export default function () {
  let res = http.get('http://localhost:8080'); // Updated to match the Docker container port
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}