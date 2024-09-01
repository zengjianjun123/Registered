<template>
  <div class="outer">
    <div class="inner">
        <div class="footer_left">
            <img src="../assets/images/logo2.png" alt="">
            <div class="tel">
                <div class="tel-icon">
                    <i class="iconfont icon-bohao"></i>
                </div>
                <div class="tel-text">
                    <p>Need help？Call us</p>
                    <p>029-88308001</p>
                </div>
            </div>
            <div class="email">
                <div class="email-icon">
                    <i class="iconfont icon-xinxi"></i>
                </div>
                <div class="email-text">
                    <p>374002499@qq.com</p>
                </div>
            </div>
            <div class="address">
                <div class="address-icon">
                    <i class="iconfont icon-guide"></i>
                </div>
                <div class="address-text">
                    <p> 陕西省西安市长安区学府大道1号</p>
                </div>
            </div>
        </div>
        <div class="footer_center">
            <div class="services">
                <h4>Services</h4>
            </div>
            <div class="services-info">
                <div>Refractive Nature</div>
                <div>Retina Surgery</div>
                <div>Cornea Transplant</div>
                <div>Contract Surgery</div>
                <div>Ptosis Repair</div>
                <div>Dry Eye Therapy</div>
            </div>
        </div>
        <div class="footer_right">
            <div class="services">
                <h4>Visiting Hours</h4>
            </div>
            <div class="visit-time">
                <ul>
                    <li>
                        <span class="day">Mon</span>
                        <div class="line"></div>
                        <span class="time">8:00 - 21:00</span>
                    </li>
                    <li>
                        <span class="day">Tue</span>
                        <div class="line"></div>
                        <span class="time">8:00 - 21:00</span>
                    </li>
                    <li>
                        <span class="day">Wed</span>
                        <div class="line"></div>
                        <span class="time">8:00 - 21:00</span>
                    </li>
                    <li>
                        <span class="day">Thu</span>
                        <div class="line"></div>
                        <span class="time">8:00 - 21:00</span>
                    </li>
                    <li>
                        <span class="day">Fri</span>
                        <div class="line"></div>
                        <span class="time">8:00 - 21:00</span>
                    </li>
                    <li>
                        <span class="day">Sat</span>
                        <div class="line"></div>
                        <span class="time">8:00 - 21:00</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="copy">
        <div class="copy_text">
            <span>&copy;2024 OptiFlexEye Care Services. All rights By ZengJJ.</span>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.outer{
    width: 100%;
    background-color: #202020;
    height: 450px;

}
.inner{
    margin: 0 auto;
    width: 70%;
    height: 85%;
    display: flex;
    /* background-color: bisque; */
    justify-content: space-between;
    align-items: center;
}
.footer_left{
    width: 300px;
    height: 350px;
    /* background-color: aquamarine; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 5px;
}
.footer_center{
    width: 300px;
    height: 350px;
    /* background-color: red; */
    margin-left: 50px;
}

.footer_right{
    width: 500px;
    height: 350px;
    /* background-color: pink; */
}
.tel{
    width: 80%;
    height: 20%;
    /* background-color: red; */
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px;
    
}
.tel-icon{
    flex-shrink: 0;
    height: 25px;
    width: 25px;
    color: #3B8A8B;
}

.tel-text{
    color: white;
    font-size: 18px;
}
.tel-text p:last-child{
    font-size: 22px;
    font-weight: bold;
}
.email{
    width: 80%;
    height: 20%;
    /* background-color: pink; */
    display: flex;
    justify-content: start;
    align-items: center;
    gap:20px
}
.email-icon{
    flex-shrink: 0;
    height: 25px;
    width: 25px;
    color: #3B8A8B;
}
.email-text{
    color: #FFFFFFBF;
    font-size: 18px;
}
.address{
    width: 80%;
    height: 20%;
    /* background-color: red; */
    display: flex;
    gap: 20px;
    justify-content: start;
    align-items: center;

}
.address-icon{
    flex-shrink: 0;
    height: 25px;
    width: 25px;
    color: #3B8A8B;
}
.address-text{
    color: #FFFFFFBF;
    font-size: 16px;
}
i{
   font-size: 22px
}
.services{
    width: 80%;
    height: 50px;
    /* background-color: #3B8A8B; */
    color: white;
    font-size: 26px;
    margin:0 auto;
    position: relative;
}
.services::before{
    position: absolute;
    content: '';
    width: 35px;
    height: 3px;
    left: 0;
    bottom: 0;
    background-color: #3B8A8B;
}
.services-info{
    margin: 0 auto;
    margin-top: 30px;
    width: 80%;
    display: flex;
    color: #FFFFFFBF;
    font-size: 20px;
    flex-direction: column;
    align-items: start;
    gap: 20px;
    padding-left: 30px
}
.visit-time{
    width:80%;
    height: 300px;
    background-color: #242424;
    margin: 15px auto;
    color: #FFFFFFBF;
    display: flex;
    justify-content: center;
    align-items: center;
}
ul{
    list-style-type: none;
    font-size: 20px;
}
li{
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
}
.line{
    height: 1px;
    width: 150px;
    border-top: 1px dashed rgba(255, 255, 255, 0.6)
}
.day{
    display: inline-block;
    width: 50px;
    margin-left: 15px;
}
.copy{
    width: 100%;
    height: 15%;
    background-color: #1A1A1A;
    display: flex;
    justify-content: center;
    align-items: center;
}
.copy_text{
    color: #BBB9BA;
}

</style>
