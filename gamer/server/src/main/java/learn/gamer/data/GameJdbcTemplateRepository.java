package learn.gamer.data;

import learn.gamer.data.mappers.GameMapper;
import learn.gamer.models.Game;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class GameJdbcTemplateRepository implements GameRepository {
    private final JdbcTemplate jdbcTemplate;
    public GameJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Game> findAll() {
        final String sql = "select game_id, game_title "
                + "from game "
                + "order by game_title;";
        return jdbcTemplate.query(sql, new GameMapper());
    }

    @Override
    @Transactional
    public Game findByGameTitle(String gameTitle) {
        final String sql = "select game_id, game_title "
                + "from game "
                + "where game_title = ?;";
        return jdbcTemplate.query(sql, new GameMapper(), gameTitle)
                .stream().findFirst().orElse(null);
    }

    @Override
    @Transactional
    public Game add(Game game) {
        final String sql = "insert into game (game_title) values (?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, game.getGameTitle());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0) {
            return null;
        }

        game.setGameId(keyHolder.getKey().intValue());
        return game;
    }

    @Override
    @Transactional
    public boolean deleteById(int gameId) {
        if (getUsageCount(gameId) == 0) {
            final String sql = "delete from game where game_id = ?;";
            return jdbcTemplate.update(sql, gameId) > 0;
        }
        return false;
    }

    @Override
    public int getUsageCount(int gameId) {
        final String sql = "select count(p.game_id) "
                + "from posting p "
                + "left outer join game g on g.game_id = p.game_id "
                + "where p.game_id = ?;";
        int postingCount = jdbcTemplate.queryForObject(sql, Integer.class, gameId);

        final String sql2 = "select count(aug.game_id) "
                + "from app_user_game aug "
                + "left outer join game g on g.game_id = aug.game_id "
                + "where aug.game_id = ?;";
        int appUserGameCount = jdbcTemplate.queryForObject(sql2, Integer.class, gameId);

        return (postingCount + appUserGameCount);
    }
}
