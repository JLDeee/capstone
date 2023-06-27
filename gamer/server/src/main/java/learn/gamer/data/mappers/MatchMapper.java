package learn.gamer.data.mappers;

import learn.gamer.models.AppUser;
import learn.gamer.models.Match;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MatchMapper implements RowMapper<Match> {

    @Override
    public Match mapRow(ResultSet rs, int rowNum) throws SQLException {
        Match match = new Match();
        match.setMatchId(rs.getInt("match_id"));
        match.setDateMatched(rs.getDate("date_match").toLocalDate());

        AppUserMapper appUserMapper1 = new AppUserMapper();
        match.setAppUser1(appUserMapper1.mapRow(rs,rowNum));
        AppUserMapper appUserMapper2 = new AppUserMapper();
        match.setAppUser2(appUserMapper2.mapRow(rs,rowNum));

        return match;
    }
}
