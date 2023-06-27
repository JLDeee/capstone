package learn.gamer.models;

import java.time.LocalDate;

public class Match {
    private int matchId;
    private int appUserId1;
    private int appUserId2;
    private LocalDate dateMatched;

    public Match() {
    }

    public Match(int matchId, int appUserId1, int appUserId2, LocalDate dateMatched) {
        this.matchId = matchId;
        this.appUserId1 = appUserId1;
        this.appUserId2 = appUserId2;
        this.dateMatched = dateMatched;
    }

    public int getMatchId() {
        return matchId;
    }

    public void setMatchId(int matchId) {
        this.matchId = matchId;
    }

    public int getAppUserId1() {
        return appUserId1;
    }

    public void setAppUserId1(int appUserId1) {
        this.appUserId1 = appUserId1;
    }

    public int getAppUserId2() {
        return appUserId2;
    }

    public void setAppUserId2(int appUserId2) {
        this.appUserId2 = appUserId2;
    }

    public LocalDate getDateMatched() {
        return dateMatched;
    }

    public void setDateMatched(LocalDate dateMatched) {
        this.dateMatched = dateMatched;
    }
}
