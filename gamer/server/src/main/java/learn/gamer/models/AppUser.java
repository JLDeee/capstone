package learn.gamer.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class AppUser implements UserDetails {
    private int appUserId;
    private final String email;
    private final String password;
    public String gamerTag;
    private boolean enabled;
    public LocalDate birthday;
    public Gender gender;
    private final Collection<GrantedAuthority> authorities;


    public AppUser(int appUserId, String email, String password, String gamerTag, LocalDate birthday, Gender gender, boolean enabled, List<String> roles, Collection<GrantedAuthority> authorities) {
        this.appUserId = appUserId;
        this.email = email;
        this.password = password;
        this.gamerTag = gamerTag;
        this.birthday = birthday;
        this.gender = gender;
        this.enabled = enabled;
        this.authorities = convertRolesToAuthorities(roles);
    }

    private static Collection<GrantedAuthority> convertRolesToAuthorities(List<String> roles) {
        return roles.stream()
                .map(r -> new SimpleGrantedAuthority(r))
                .collect(Collectors.toList());
    }

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>(authorities);
    }
@Override
    public String getPassword() {
        return password;
    }

    @Override //this is referred to as email in our fields
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public String getGamerTag() {
        return gamerTag;
    }

    public void setGamerTag(String gamerTag) {
        this.gamerTag = gamerTag;
    }
@Override
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }
}
