package com.kun.xining7.service;

import com.kun.framework.core.jdbc.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 随tomcat启动运行
 */
@Service
public class InitCacheService {

    @Scheduled(cron = "*/5 * * * * ?")
    public void dealJobNums2() {
        System.out.println("每5秒钟执行一次");
    }

    @Scheduled(cron="0/5 * *  * * ? ")
    public void browseTimer() {
        System.out.println("每5分钟执行一次");
    }


//    @Scheduled(cron="44 14 1,14,20 * * ?")
//    public void browseTimer2() {
//        System.out.println("2");
//    }
}
