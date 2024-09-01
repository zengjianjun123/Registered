export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//医院详情信息
export interface HospitalDetail {
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
  hospital: {
    id: string;
    createTime: string;
    updateTime: string;
    isDeleted: number;
    param: {
      hostypeString: string;
      fullAddress: string;
    };
    hoscode: string;
    hosname: string;
    hostype: string;
    provinceCode: string;
    cityCode: string;
    districtCode: string;
    address: string;
    logoData: string;
    intro: null;
    route: string;
    status: number;
    bookingRule: null;
  };
}

export interface HospitalDetailResponse extends ResponseData {
  data: HospitalDetail;
}

//医院科室
export interface Department {
  depcode: string;
  depname: string;
  children?: Department[];
}
// 存储科室的数组类型
export type DepartmentArr = Department[];
//科室接口 返回的数据类型
export interface DepartmentResponse extends ResponseData {
  data: DepartmentArr;
}

//发送用户登录接口需要携带参数类型
export interface LoginData {
  phone: string;
  code: string;
}
//登录接口返回的用户信息接口
export interface UserInfo {
  name: string;
  token: string;
}

// 登录接口返回数据类型
export interface UserLoginResponse extends ResponseData {
  data: UserInfo;
}

// 微信二维码登录返回数据类型
export interface WXLogin {
  redirectUri: string;
  appid: string;
  scope: string;
  state: string;
}
//请求返回类型
export interface WXLoginResponse extends ResponseData {
  data: WXLogin;
}

//挂号数据类型
export interface BaseMap {
  workDateString: string;
  releaseTime: string;
  bigname: string;
  stopTime: string;
  depname: string;
  hosname: string;
}

//
export interface WorkData {
  workDate: string;
  workDateMd: string;
  dayOfWeek: string;
  docCount: number;
  reservedNumber: null;
  availableNumber: number;
  status: number;
}

export type BookingScheduleList = WorkData[];

// 接口返回ts数据
export interface HospitalWorkDataResponse extends ResponseData {
  data: {
    total: number;
    bookingScheduleList: BookingScheduleList;
    baseMap: BaseMap;
  };
}

//一个医生的数据
export interface Doctor {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: string;
  param: {
    dayOfWeek: string;
    depname: string;
    hosname: string;
  };
  hoscode: string;
  depcode: string;
  title: string;
  docname: string;
  skill: string;
  workDate: string;
  workTime: number;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  status: number;
  hosScheduleId: string;
}

// 数组包含全部医生
export type DocArr = Doctor[];

// 获取医生排班接口返回的数据
export interface DoctorResponse extends ResponseData {
  data: DocArr;
}

//代表的是一个就诊人数据ts类型
export interface User {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    certificatesTypeString: string;
    contactsCertificatesTypeString: string;
    cityString: null;
    fullAddress: string;
    districtString: null;
    provinceString: null;
  };
  userId: number;
  name: string;
  certificatesType: string;
  certificatesNo: string;
  sex: number;
  birthdate: string;
  phone: string;
  isMarry: number;
  provinceCode: null;
  cityCode: null;
  districtCode: null;
  address: string;
  contactsName: string;
  contactsCertificatesType: string;
  contactsCertificatesNo: string;
  contactsPhone: string;
  isInsure: number;
  cardNo: null;
  status: string;
}
export type UserArr = User[];

// 接口返回类型
export interface UserResponse extends ResponseData {
  data: UserArr;
}

export interface DoctorInfoResponse extends ResponseData {
  data: Doctor;
}
