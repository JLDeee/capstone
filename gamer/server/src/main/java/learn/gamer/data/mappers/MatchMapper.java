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
        match.setAppUserId1(rs.getInt("user_id_one"));
        match.setAppUserId2(rs.getInt("user_id_two"));
        return match;
    }
}
