package learn.gamer.models;

import java.time.LocalDateTime;

public class Match {
    private int matchId;
    private AppUser appUser1;
    private AppUser appUser2;
    private LocalDateTime matchTime;

    public Match(int matchId, AppUser appUser1, AppUser appUser2, LocalDateTime matchTime) {
        this.matchId = matchId;
        this.appUser1 = appUser1;
        this.appUser2 = appUser2;
        this.matchTime = matchTime;
    }
}
