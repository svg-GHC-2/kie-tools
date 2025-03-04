/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const DAYS_AND_TIME_DURATION_FORMAT = "days and time duration";
export const DAYS_AND_TIME_DURATION_REGEXP =
  /^(-|\+)?P(?:([-+]?[0-9]*)D)?(?:T(?:([-+]?[0-9]*)H)?(?:([-+]?[0-9]*)M)?(?:([-+]?[0-9]*)S)?)?$/;

export const YEARS_AND_MONTHS_DURATION_FORMAT = "years and months duration";
export const YEARS_AND_MONTHS_DURATION_REGEXP = /^(-|\+)?P(?:([-+]?[0-9]*)Y)?(?:([-+]?[0-9]*)M)?$/;
