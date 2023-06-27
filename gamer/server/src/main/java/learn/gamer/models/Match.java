package learn.gamer.models;

import java.time.LocalDate;

public class Match {
    private int matchId;
    private AppUser appUser1;
    private AppUser appUser2;
    private LocalDate matchTime;

    public Match() {
    }

    public Match(int matchId, AppUser appUser1, AppUser appUser2, LocalDate matchTime) {
        this.matchId = matchId;
        this.appUser1 = appUser1;
        this.appUser2 = appUser2;
        this.matchTime = matchTime;
    }

    public int getMatchId() {
        return matchId;
    }

    public void setMatchId(int matchId) {
        this.matchId = matchId;
    }

    public AppUser getAppUser1() {
        return appUser1;
    }

    public void setAppUser1(AppUser appUser1) {
        this.appUser1 = appUser1;
    }

    public AppUser getAppUser2() {
        return appUser2;
    }

    public void setAppUser2(AppUser appUser2) {
        this.appUser2 = appUser2;
    }

    public LocalDate getMatchTime() {
        return matchTime;
    }

    public void setMatchTime(LocalDate matchTime) {
        this.matchTime = matchTime;
    }
}
