<template>
    <div class="container">
        <h2>{{ detaileStore.hospitalInfo.hospital?.hosname || '人民医院' }}预约挂号通知</h2>
        <div class="content">
            <div>为方便您早日就医康复，请认真阅读预约挂号通知：</div>
            <div class="sp">一、预约实名制：</div>
            <div class="ssp">统—平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号(身份证、护照)、性别、手机号码.社保卡号等基本信息。</div>
            <div class="sp">二、预约挂号：</div>
            <div class="ssp">按照北京市卫健委统—平台要求，预约挂号规则如下:</div>
            <div class="ssp">在同—自然日，同—医院，同一科室，同—就诊单元，同—就诊人，可以预约最多1个号源;</div>
            <div class="ssp"> 在同—自然周，同—就诊人，可以预约最多8个号源;</div>
            <div class="ssp">在同—自然月，同—就诊人，可以预约最多12个号源;</div>
            <div class="ssp">在同一自然季度，同—就诊人，可以预约最多24个号源。</div>
            <div class="sp">三、取消挂号：</div>
            <div class="ssp">已完成预约的号源，如需办理退号，至少在就诊前一工作日14:00前通过网站、微信公众号、114电话等平台预约渠道进行取消预约</div>
            <div class="sp">四、爽约处理：</div>
            <div class="ssp">如预约成功后患者未能按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下:</div>
            <div class="ssp">累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号;</div>
            <div class="ssp">累计爽约6次，自6次爽约日起，180天内不允许通过114平台进行预约挂号。</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import useDetailStore from '@/store/modules/hospitalDetail';
let detaileStore = useDetailStore()
</script>
<style scoped>
.container {
    margin-top: 30px;
    width: 90%;
}

.content {
    margin-left: 50px;
}

.content div.ssp {
    margin-top: 15px;
    margin-left: 25px;
}

.content div.sp {
    margin-top: 40px;
    font-size: 18px;
    font-weight: 600;
    color: rgba(255, 0, 0, 0.705);
}

h2 {
    text-align: center;
}
</style>
